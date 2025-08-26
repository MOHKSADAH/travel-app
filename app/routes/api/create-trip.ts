import { GoogleGenerativeAI } from '@google/generative-ai';
import { ID } from 'appwrite';
import { data, type ActionFunctionArgs } from 'react-router';
import { appwriteConfig, database } from '~/appwrite/client';
import { parseMarkdownToJson } from '~/lib/utils';

export const action = async ({ request }: ActionFunctionArgs) => {
    const { country, numberOfDays, travelStyle, interests, budget, groupType, userId } =
        await request.json();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const unsplashApiKey = process.env.UNSPLASH_ACCESS_KEY!;

    try {
        const prompt = `You are an expert travel planner. Create a detailed ${numberOfDays}-day travel itinerary for ${country}.

        USER DETAILS:
        Budget: ${budget}
        Interests: ${interests}
        Travel Style: ${travelStyle}
        Group Type: ${groupType}

        REQUIREMENTS:
        - Include realistic current pricing
        - Balance popular attractions with authentic local experiences
        - Consider budget constraints and travel style preferences
        - Provide practical, actionable recommendations

        Return ONLY valid JSON (no markdown, no code blocks) with this exact structure:

        {
        "name": "Compelling trip title (max 60 characters)",
        "description": "Engaging trip overview highlighting key experiences (80-100 words)",
        "estimatedPrice": "$X,XXX",
        "duration": ${numberOfDays},
        "budget": "${budget}",
        "travelStyle": "${travelStyle}",
        "country": "${country}",
        "interests": ${Array.isArray(interests) ? JSON.stringify(interests) : `"${interests}"`},
        "groupType": "${groupType}",
        "bestTimeToVisit": [
            "🌸 Spring (Mar-May): Pleasant weather, blooming scenery, moderate crowds",
            "☀️ Summer (Jun-Aug): Peak season, warmest weather, vibrant atmosphere",
            "🍁 Autumn (Sep-Nov): Comfortable temperatures, beautiful colors, fewer tourists",
            "❄️ Winter (Dec-Feb): Cool weather, unique seasonal activities, best prices"
        ],
        "weatherInfo": [
            "🌸 Spring: 15-22°C (59-72°F) - Mild and pleasant",
            "☀️ Summer: 25-30°C (77-86°F) - Warm and sunny",
            "🍁 Autumn: 18-25°C (64-77°F) - Comfortable and crisp",
            "❄️ Winter: 10-17°C (50-63°F) - Cool and refreshing"
        ],
        "location": {
            "city": "Primary destination city or region",
            "coordinates": [latitude, longitude],
            "openStreetMap": "https://www.openstreetmap.org/#map=12/lat/lng"
        },
        "budgetBreakdown": {
            "accommodation": "$XXX (${numberOfDays} nights)",
            "meals": "$XXX (all meals)",
            "activities": "$XXX (tours and attractions)",
            "transportation": "$XXX (local transport)",
            "miscellaneous": "$XXX (shopping and extras)"
        },
        "itinerary": [
            {
            "day": 1,
            "location": "Specific city or area name",
            "theme": "Day theme (e.g., Historic City Center)",
            "activities": [
                {
                "time": "Morning (9:00-12:00)",
                "title": "Main morning activity name",
                "description": "🏛️ Detailed activity description with what to expect",
                "cost": "$XX",
                "tips": "Practical tip or recommendation"
                },
                {
                "time": "Afternoon (12:00-17:00)",
                "title": "Afternoon activity name",
                "description": "🍽️ Activity description including cultural context",
                "cost": "$XX",
                "tips": "Local insight or recommendation"
                },
                {
                "time": "Evening (17:00-21:00)",
                "title": "Evening activity name",
                "description": "🌅 Evening experience description",
                "cost": "$XX",
                "tips": "Helpful tip for the experience"
                }
            ],
            "meals": {
                "breakfast": "Recommended breakfast spot or local option",
                "lunch": "Suggested lunch venue or cuisine type",
                "dinner": "Evening dining recommendation"
            },
            "accommodation": "Suggested neighborhood to stay with brief reason",
            "dailyTotal": "$XXX"
            }
        ],
        "localTips": [
            "💰 Best money-saving strategies for this destination",
            "🚗 Most efficient transportation methods",
            "🍴 Must-try local dishes and where to find them",
            "📱 Useful apps or phrases for travelers",
            "🎯 Cultural etiquette or customs to know"
        ],
        "packingEssentials": [
            "Weather-appropriate clothing for the season",
            "Important documents and travel items",
            "Activity-specific gear or equipment",
            "Local customs considerations"
        ]
        }`;

        const textResult = await genAI
            .getGenerativeModel({ model: 'gemini-2.0-flash' })
            .generateContent([prompt]);

        const trip = parseMarkdownToJson(textResult.response.text());

        // Fetch images from Unsplash
        const imageResponse = await fetch(
            `https://api.unsplash.com/search/photos?query=${country} ${travelStyle}&client_id=${unsplashApiKey}`
        );
        const imageUrls = (await imageResponse.json()).results
            .slice(0, 3)
            .map((result: any) => result.urls?.regular || null);

        const result = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.tripCollectionId,
            ID.unique(),
            {
                tripDetail: JSON.stringify(trip),
                createdAt: new Date().toISOString(),
                imageUrls,
                userId,
            }
        );

        return data({ id: result.$id });
    } catch (e) {
        console.error('Error in creating trip ', e);
        return data({ error: 'Failed to create trip' });
    }
};
