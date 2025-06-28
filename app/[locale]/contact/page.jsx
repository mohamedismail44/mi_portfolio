"use client"
import { motion } from 'framer-motion';
import ContactForm from '../components/contact/ContactForm';

const Contact = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{
				ease: 'easeInOut',
				duration: 0.5,
				delay: 0.1,
			}}
			className="container mx-auto flex justify-center items-center py-5 lg:py-10 lg:mt-10"
		>
			<ContactForm />
		</motion.div>
	);
};

export default Contact;
