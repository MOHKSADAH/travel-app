// UI Components for form inputs
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { Header } from 'components';
// Type definitions for route
import type { Route } from './+types/create-trip';
// Form configuration constants
import { comboBoxItems, selectItems } from '~/constants';
// Utility functions for styling and formatting
import { cn, formatKey } from '~/lib/utils';
// Map visualization components
import { LayerDirective, LayersDirective, MapsComponent } from '@syncfusion/ej2-react-maps';
import React, { useState } from 'react';
// World map GeoJSON data
import { world_map } from '~/constants/world_map';
// Button component for form submission
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
// Appwrite authentication client
import { account } from '~/appwrite/client';
// Navigation hook
import { useNavigate } from 'react-router';

/**
 * Data Loader for Create Trip Page
 *
 * Fetches country data from REST Countries API for the destination selector.
 * Provides country names, flags, coordinates for map visualization.
 *
 * Features:
 * - Fetches independent countries only
 * - Includes flags as emojis
 * - Provides coordinates for map marking
 * - Includes OpenStreetMap links
 *
 * @returns Array of processed country data objects
 */
export const loader = async () => {
    // Fetch country data with specific fields
    const response = await fetch(
        'https://restcountries.com/v3.1/independent?status=true&fields=flag,name,latlng,maps,openStreetMap,coordinates'
    );
    const data = await response.json();

    // Validate API response format
    if (!Array.isArray(data)) {
        console.error('Expected an array but got:', data);
        return [];
    }

    // Transform API data into component-friendly format
    return data.map((country: any) => ({
        name: country.flag + country.name.common, // Combine flag emoji with name
        coordinates: country.latlng, // [lat, lng] for map marker
        value: country.name.common, // Clean name for form value
        openStreetMap: country.maps?.openStreetMap, // Link to OSM
    }));
};

/**
 * Create Trip Component
 *
 * Form interface for generating AI-powered trip itineraries.
 * Collects user preferences and generates personalized travel plans.
 *
 * Features:
 * - Country selection with map visualization
 * - Trip duration setting
 * - Travel style and interest selection
 * - Budget and group type configuration
 * - AI-powered itinerary generation
 *
 * @param props - Route component props containing country data
 */
const CreateTrip = ({ loaderData }: Route.ComponentProps) => {
    // Cast loader data to country array type
    const countries = loaderData as Country[];
    const navigate = useNavigate();

    // Form state management
    const [formData, setFormData] = useState<TripFormData>({
        country: countries[0]?.name || '',
        travelStyle: '',
        interest: '',
        duration: 0,
        budget: '',
        groupType: '',
    });

    // UI state management
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    /**
     * Handle form submission
     * Validates input and calls AI trip generation API
     *
     * @param e - Form submission event
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        // Validate required fields
        if (
            !formData.country ||
            !formData.travelStyle ||
            !formData.interest ||
            !formData.budget ||
            !formData.groupType
        ) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        // Validate duration range
        if (formData.duration < 1 || formData.duration > 10) {
            setError('Duration must be between 1 and 10 days');
            setLoading(false);
            return;
        }

        // Check user authentication
        const user = await account.get();
        if (!user.$id) {
            console.error('User not authenticated');
            setLoading(false);
            return;
        }

        try {
            // Call AI trip generation API
            const response = await fetch('/api/create-trip', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    country: formData.country,
                    numberOfDays: formData.duration,
                    travelStyle: formData.travelStyle,
                    interests: formData.interest,
                    budget: formData.budget,
                    groupType: formData.groupType,
                    userId: user.$id,
                }),
            });

            const result: CreateTripResponse = await response.json();

            // Navigate to new trip on success
            if (result?.id) navigate(`/trips/${result.id}`);
            else console.error('failed to generate a trip');
        } catch (e) {
            console.error('Error creating trip:', e);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Handle form field changes
     * Updates form state with new values
     *
     * @param key - Field name from TripFormData type
     * @param value - New field value
     */
    const handleChange = (key: keyof TripFormData, value: string | number) => {
        setFormData({ ...formData, [key]: value });
    };

    /**
     * Transform country data for ComboBox component
     * Maps country objects to ComboBox-compatible format
     */
    const countryData = countries.map((country) => ({
        text: country.name, // Display name with flag
        value: country.value, // Clean name for form
    }));

    /**
     * Prepare data for map visualization
     * Creates marker data for selected country
     */
    const mapData = [
        {
            country: formData.country,
            color: '#EA382E', // Red marker color
            coordinates:
                countries.find((c: Country) => c.name === formData.country)?.coordinates || [],
        },
    ];

    return (
        <main className="flex flex-col gap-10 pb-20 wrapper">
            {/* Page header */}
            <Header title="Create Trip" description="Fill in the details to create a new trip" />

            <section className="mt-2.5 wrapper-md">
                <form className="trip-form" onSubmit={handleSubmit}>
                    {/* Country Selection ComboBox */}
                    <div>
                        <label htmlFor="country">Country</label>
                        <ComboBoxComponent
                            id="country"
                            dataSource={countryData}
                            fields={{ text: 'text', value: 'value' }} // Map data fields
                            placeholder="Select a country"
                            className="combo-box"
                            change={(e: { value: string | undefined }) => {
                                if (e.value) {
                                    handleChange('country', e.value);
                                }
                            }}
                            allowFiltering // Enable search/filter
                            filtering={(e) => {
                                // Real-time country search filtering
                                const query = e.text.toLowerCase();
                                e.updateData(
                                    countries
                                        .filter((country) =>
                                            country.name.toLowerCase().includes(query)
                                        )
                                        .map((country) => ({
                                            text: country.name,
                                            value: country.value,
                                        }))
                                );
                            }}
                        />
                    </div>

                    <div>
                        <label htmlFor="duration">Duration</label>
                        <input
                            id="duration"
                            name="duration"
                            placeholder="Enter trip duration in days"
                            className="form-input placeholder:text-gray-100"
                            onChange={(e) => handleChange('duration', Number(e.target.value))}
                        />
                    </div>
                    {selectItems.map((key) => (
                        <div key={key}>
                            <label htmlFor={key}>{formatKey(key)}</label>

                            <ComboBoxComponent
                                id={key}
                                dataSource={comboBoxItems[key].map((item) => ({
                                    text: item,
                                    value: item,
                                }))}
                                fields={{ text: 'text', value: 'value' }}
                                placeholder={`Select a ${formatKey(key)}`}
                                change={(e: { value: string | undefined }) => {
                                    if (e.value) {
                                        handleChange(key, e.value);
                                    }
                                }}
                                allowFiltering
                                filtering={(e) => {
                                    const query = e.text.toLowerCase();
                                    e.updateData(
                                        comboBoxItems[key]
                                            .filter((item) => item.toLowerCase().includes(query))
                                            .map((item) => ({
                                                text: item,
                                                value: item,
                                            }))
                                    );
                                }}
                                className="combo-box"
                            />
                        </div>
                    ))}

                    {/* World Map Visualization */}
                    <div>
                        <label htmlFor="location">Location on the world map</label>
                        <MapsComponent>
                            <LayersDirective>
                                <LayerDirective
                                    shapeData={world_map} // World map GeoJSON
                                    dataSource={mapData} // Selected country marker
                                    shapePropertyPath="name" // Map region name field
                                    shapeDataPath="country" // Data binding field
                                    shapeSettings={{
                                        colorValuePath: 'color', // Marker color field
                                        fill: '#e5e5e5', // Default map color
                                    }}
                                />
                            </LayersDirective>
                        </MapsComponent>
                    </div>

                    {/* Divider line */}
                    <div className="bg-gray-200 h-px w-full" />

                    {/* Error message display */}
                    {error && (
                        <div className="error">
                            <p>{error}</p>
                        </div>
                    )}

                    {/* Submit Button Section */}
                    <footer className="px-6 w-full">
                        <ButtonComponent
                            type="submit"
                            className="button-class !h-12 !w-full"
                            disabled={loading}
                        >
                            {/* Dynamic loading/magic icon */}
                            <img
                                src={`/assets/icons/${loading ? 'loader.svg' : 'magic-star.svg'}`}
                                className={cn('size-5', {
                                    'animate-spin': loading, // Spin animation during loading
                                })}
                            />

                            {/* Button text */}
                            <span className="p-16-semibold text-white">
                                {loading ? 'Generating..' : 'Generate Trip'}
                            </span>
                        </ButtonComponent>
                    </footer>
                </form>
            </section>
        </main>
    );
};

export default CreateTrip;
