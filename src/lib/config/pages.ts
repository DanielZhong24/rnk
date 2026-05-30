import { IconBrandGithub, IconBrandLinkedin, IconBrandX } from '@tabler/icons-svelte';
import Site from '$lib/config/common';

export const Home = {
	socialLinks: [
		{
			href: Site.out.github,
			text: 'GitHub',
			icon: IconBrandGithub
		},
		{
			href: Site.out.linkedin,
			text: 'LinkedIn',
			icon: IconBrandLinkedin
		},
	]
};

export interface ExperienceTimelineItem {
	company: string;
	role: string;
	url: string;
	logoUrl: string;
	logoAlt: string;
	startDate: string;
	endDate?: string; // optional endDate. If present, it's a past role.
	details?: string; // Optional details for expansion
	logoScale?: number; // Optional logo scale multiplier
}

export const experienceTimeline: ExperienceTimelineItem[] = [
	{
		company: 'IBM',
		role: 'Software Developer Intern',
		url: 'https://ibm.com',
		logoUrl: '/logos/ibm.svg',
		logoAlt: 'IBM Logo',
		startDate: '2026-05',
		details:
			'Intern at IBM, building model evaluation tools for IBM Bob harness to increase agent performance and cut cost on tokens.',
		logoScale: 1.15
	},
	{
		company: 'Flash Coding',
		role: 'Software Engineer Intern',
		url: 'https://flashcoding.ca/',
		logoUrl: '/logos/flash-coding.svg',
		logoAlt: 'Flash Coding logo',
		startDate: '2023-08',
		endDate: '2024-08',
		details:
			'As an intern, I lead a small team of other engineer interns and develop ERP systems for a flooring company in Toronto, serving over 10k customers and contractors.'
	},
	{
		company: 'Hatch Coding',
		role: 'Software Intern',
		url: 'https://www.rootstrap.com/featured-cases/hatch-coding',
		logoUrl: '/logos/hatch-coding.svg',
		logoAlt: 'Hack Canada Logo',
		startDate: '2023-02',
		endDate: '2023-07',
		details:
			"Enhanced Dex, an AI teaching assistant, with focused research and feedback."
	}
];
