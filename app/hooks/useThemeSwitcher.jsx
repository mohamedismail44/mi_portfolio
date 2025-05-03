"use client";
import { useEffect, useState } from 'react';

const useThemeSwitcher = () => {
	const [theme, setTheme] = useState('');
	const activeTheme = theme === 'dark' ? 'light' : 'dark';

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const savedTheme = localStorage.getItem('theme');
			setTheme(savedTheme || ''); // تعيينها هنا
		}
	}, []);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const root = window.document.documentElement;

			if (activeTheme) {
				root.classList.remove(activeTheme);
			}
			if (theme) {
				root.classList.add(theme);
			}
			localStorage.setItem('theme', theme);
		}
	}, [theme, activeTheme]);

	return [activeTheme, setTheme];
};

export default useThemeSwitcher;