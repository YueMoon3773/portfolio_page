import { motion } from 'framer-motion';
import { z } from 'zod';

import ValidatedComponent from '../../../utils/validateComponentProps';

const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

const fadeUpWrapperSchema = z.object({
    delay: z.number().optional(),
    duration: z.number().optional(),
    className: z.string(),
    children: z.unknown(),
});

const FadeUpWrapper = ({ delay = 0, duration = 0.6, className, children }) => {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }} // triggers one time, when 10% of element is visible
            variants={fadeUpVariants}
            transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
        >
            {children}
        </motion.div>
    );
};

export default ValidatedComponent(FadeUpWrapper, fadeUpWrapperSchema);
