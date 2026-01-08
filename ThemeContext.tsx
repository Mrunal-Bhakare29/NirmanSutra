import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = 'APP_THEME';

export const themes = {
    light: {
        background: '#ffffff',
        text: '#000000',
        card: '#f1f1f1',
        border: '#e0e0e0',
        subText: '#555555',
        accent: '#FBC02D',
    },
    dark: {
        background: '#000000',
        text: '#ffffff',
        subText: '#cccccc',
        accent: '#FBC02D',
        card: '#1c1c1e',
        border: '#2c2c2e',
    },
};

type ThemeType = 'light' | 'dark';

interface ThemeContextProps {
    theme: typeof themes.light;
    themeType: ThemeType;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
    theme: themes.light,
    themeType: 'light',
    toggleTheme: () => { },
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [themeType, setThemeType] = useState<ThemeType>('light');

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const storedTheme = await AsyncStorage.getItem(THEME_KEY);
                if (storedTheme === 'light' || storedTheme === 'dark') {
                    setThemeType(storedTheme);
                } else {
                    const systemTheme = Appearance.getColorScheme() || 'light';
                    setThemeType(systemTheme);
                }
            } catch (error) {
                console.warn('Failed to load theme:', error);
            }
        };

        loadTheme();
    }, []);

    const toggleTheme = async () => {
        const newTheme = themeType === 'light' ? 'dark' : 'light';
        setThemeType(newTheme);
        try {
            await AsyncStorage.setItem(THEME_KEY, newTheme);
        } catch (error) {
            console.warn('Failed to save theme:', error);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme: themes[themeType], themeType, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
