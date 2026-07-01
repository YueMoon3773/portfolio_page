import { motion } from 'framer-motion';
import { z } from 'zod';

import ValidatedComponent from '../../../utils/validateComponentProps';

const popSpinVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8, skewY: '16deg' },
    visible: { opacity: 1, y: 0, scale: 1, skewY: 0 },
};

const popSpinWrapperSchema = z.object({
    delay: z.number().optional(),
    duration: z.number().optional(),
    className: z.string(),
    children: z.unknown(),
});

const PopSpinWrapper = ({ delay = 0, duration = 0.6, className, children }) => {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }} // triggers one time, when 10% of element is visible
            variants={popSpinVariants}
            transition={{
                delay,
                duration,
                ease: [0.25, 0.1, 0.25, 1],
                // "type: spring" with these values gives the little overshoot/bounce —
                // this is what makes it feel like a "pop" instead of a flat scale-up
                type: 'spring',
                stiffness: 260,
                damping: 18,
            }}
        >
            {children}
        </motion.div>
    );
};

export default ValidatedComponent(PopSpinWrapper, popSpinWrapperSchema);
