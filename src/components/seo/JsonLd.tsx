import React from 'react';

export default function JsonLd() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://hariombhati.com/#person',
    name: 'Hariom Bhati',
    givenName: 'Hariom',
    familyName: 'Bhati',
    jobTitle: 'Performance Marketing & Growth Specialist',
    description:
      'Performance Marketing & Growth Specialist based in Indore, India. Specializing in Meta Ads scaling up to 7.25x ROAS, Google Ads, GA4 & Server-Side GTM tracking, D2C e-commerce growth, and automated lead generation funnels.',
    image: 'https://hariombhati.com/hariom-bhati.jpg',
    url: 'https://hariombhati.com',
    email: 'mailto:bhatih143@gmail.com',
    telephone: '+916265966868',
    gender: 'Male',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Indore',
      addressRegion: 'Madhya Pradesh',
      addressCountry: 'IN',
    },
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'B.Com in Computer Applications',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'PGDCA (Post Graduate Diploma in Computer Applications)',
      },
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Google Ads Search Certification',
        credentialCategory: 'certification',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Google Skillshop',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Google Ads Display Certification',
        credentialCategory: 'certification',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Google Skillshop',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'HubSpot Inbound Marketing Certification',
        credentialCategory: 'certification',
        recognizedBy: {
          '@type': 'Organization',
          name: 'HubSpot Academy',
        },
      },
    ],
    knowsAbout: [
      'Performance Marketing',
      'Meta Advantage+ Shopping Campaigns',
      'Google Ads & Performance Max',
      'Server-Side Google Tag Manager (sGTM)',
      'Meta Conversions API (CAPI)',
      'Google Analytics 4 (GA4)',
      'Conversion Rate Optimization (CRO)',
      'E-Commerce & D2C Growth',
      'Lead Generation Funnels',
      'ROAS & CAC Economics',
    ],
    sameAs: [
      'https://linkedin.com/in/hariombhati',
      'https://github.com/hariombhati',
      'https://wa.me/916265966868',
    ],
  };

  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': 'https://hariombhati.com/#webpage',
    url: 'https://hariombhati.com',
    name: 'Hariom Bhati — Performance Marketing & Growth Specialist',
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://hariombhati.com/#website',
      name: 'Hariom Bhati Portfolio',
      url: 'https://hariombhati.com',
    },
    about: {
      '@id': 'https://hariombhati.com/#person',
    },
    mainEntity: {
      '@id': 'https://hariombhati.com/#person',
    },
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://hariombhati.com/#service',
    name: 'Hariom Bhati — Performance Marketing & Growth Consulting',
    image: 'https://hariombhati.com/hariom-bhati.jpg',
    url: 'https://hariombhati.com',
    telephone: '+916265966868',
    priceRange: '₹₹₹',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Indore',
      addressRegion: 'Madhya Pradesh',
      addressCountry: 'IN',
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'India',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Worldwide Remote',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Performance Marketing Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Meta Ads & Paid Media Scaling (ROAS Optimization)',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Server-Side GA4 & Meta CAPI Telemetry Setup',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Google Ads & Performance Max Campaign Architecture',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'High-Converting Landing Page & WhatsApp Checkout CRO',
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
