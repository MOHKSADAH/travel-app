/**
 * InfoPill Component Props
 * Defines the structure for a simple icon + text pill
 */
interface InfoPillProps {
    text: string; // Text to display in the pill
    image: string; // Icon/image URL to show before text
}

/**
 * InfoPill Component
 *
 * A minimal, reusable component for displaying icon + text combinations.
 * Used throughout the app for tags, labels, and metadata display.
 *
 * Features:
 * - Consistent icon + text layout
 * - Semantic HTML with figure/figcaption
 * - Accessible image alt text
 * - Styled with info-pill class for uniform appearance
 *
 * @param props - InfoPillProps containing text and image URL
 */
const InfoPill = ({ text, image }: InfoPillProps) => {
    return (
        <figure className="info-pill">
            <img src={image} alt={text} />
            <figcaption>{text}</figcaption>
        </figure>
    );
};

export default InfoPill;
