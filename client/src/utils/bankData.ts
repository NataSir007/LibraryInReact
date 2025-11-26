export interface Bank {
  id: string;
  name: string;
  logo: string;
  logoFallback?: string;
}

export const banks: Bank[] = [
  {
    id: 'varmennekortti',
    name: 'Varmennekortti',
    logo: '/assets/logos/varmennekortti.svg',
  },
  {
    id: 'mobiilivarmenne',
    name: 'Mobiilivarmenne',
    logo: '/assets/logos/mobiilivarmenne.svg',
  },
  {
    id: 'osuuspankki',
    name: 'Osuuspankki',
    logo: '/assets/logos/osuuspankki.svg',
  },
  {
    id: 'nordea',
    name: 'Nordea',
    logo: '/assets/logos/nordea.svg',
  },
  {
    id: 'danske',
    name: 'Danske Bank',
    logo: '/assets/logos/danske.svg',
  },
  {
    id: 'alandsbanken',
    name: 'Ålandsbanken',
    logo: '/assets/logos/alandsbanken.svg',
  },
  {
    id: 'spankki',
    name: 'S-Pankki',
    logo: '/assets/logos/spankki.svg',
  },
  {
    id: 'aktia',
    name: 'Aktia',
    logo: '/assets/logos/aktia.svg',
  },
  {
    id: 'pop',
    name: 'POP Pankki',
    logo: '/assets/logos/pop.svg',
  },
  {
    id: 'saastopankki',
    name: 'Säästöpankki',
    logo: '/assets/logos/saastopankki.svg',
  },
  {
    id: 'oma',
    name: 'Oma Säästöpankki',
    logo: '/assets/logos/oma.svg',
  },
  {
    id: 'hightrust',
    name: 'Hightrust.id',
    logo: '/assets/logos/hightrust.svg',
  },
];
