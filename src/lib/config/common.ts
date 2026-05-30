import {
	type Icon,
	IconBrandBluesky,
	IconBrandGithub,
	IconBrandLinkedin,
	IconBrandX
} from '@tabler/icons-svelte';
import { dev } from '$app/environment';
import Wakatime from '$lib/icons/Wakatime.svelte';

interface Site {
	name: string;
	url: string;
	description: string;
	tags: string[];
	seo: {
		author: string;
		birthDate: string;
		worksFor: {
			name: string;
			url: string;
		};
		location: {
			city: string;
			region: string;
			country: string;
		};
	};
	abacus: { instance: string; namespace: string; key: string };
	out: {
		github: string;
		linkedin: string;
		calcom: string;
		wakatime: string;
		bluesky: string;
		instagram: string;
		x: string;
	};
	repo: { url: string; commitBaseUrl: string };
}

const Site: Site = {
	name: 'Daniel Zhong',
	url: dev ? 'http://localhost:5173' : 'https://danielzhong.dev',
	description:
		'Daniel Zhong - Undergraduate CS student and software developer. Currently @IBM',
	tags: [
		'Daniel Zhong',
		'Software Engineer',
		'Software Developer',
		'Canada',
		'Golang Developer',
		'Python Developer',
		'DevOps Engineer',
		'Software Engineering',
		'Backend Developer',
		'Full Stack Developer',
		'Hackathon Developer',
		'Toronto Tech',
		'Canadian Developer',
		'Web Development',
		'Cloud Computing',
		'API Development',
		'Software Architecture'
	],
	seo: {
		author: 'Daniel Zhong',
		birthDate: '2006-04-19',
		worksFor: {
			name: 'IBM',
			url: 'https://www.ibm.com'
		},
		location: {
			city: 'Toronto',
			region: 'Ontario',
			country: 'Canada'
		}
	},
	abacus: {
		instance: 'https://abacus.jasoncameron.dev',
		namespace: 'default',
		key: 'danielzhong.up.railway.app'
	},
	out: {
		github: 'https://github.com/DanielZhong24',
		linkedin: 'https://www.linkedin.com/in/danielzhong06/',
		calcom: '',
		wakatime: '',
		bluesky: '',
		instagram: '',
		x: ''
	},
	repo: {
		url: 'https://github.com/DanielZhong24',
		commitBaseUrl: 'https://github.com/DanielZhong24/rnk/commit/'
	}
};

export default Site;

export const Socials = [
	{
		url: Site.out.github,
		label: 'GitHub',
		icon: IconBrandGithub,
		footer: true
	},
	{
		url: Site.out.linkedin,
		label: 'LinkedIn',
		icon: IconBrandLinkedin,
		footer: true
	},
	{
		url: Site.out.x,
		label: 'X',
		icon: IconBrandX,
		footer: true
	},
	{
		url: Site.out.bluesky,
		label: 'Bluesky',
		icon: IconBrandBluesky,
		footer: false
	},
	{
		url: Site.out.wakatime,
		label: 'WakaTime',
		icon: Wakatime as unknown as Icon,
		footer: false
	}
];
