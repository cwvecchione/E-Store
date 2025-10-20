import { useState } from "react";
import PropTypes from "prop-types";

export const Accordion = ({faq}) => {
    Accordion.propTypes = {
        faq: PropTypes.shape({
            question: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            answer: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        }).isRequired,
    };
    const {question, answer} = faq;
    const [show, setShow] = useState(false);

    return (
        <div className="collapse collapse-arrow border-b">
            <input type="checkbox" className="peer" checked={show} readOnly />
            <div className="collapse-title text-xl font-medium">
                {question}
            </div>
            <div className="collapse-content">
                <p className="text-lg mb-2">{answer}</p>
            </div>
        </div>
    )
}
