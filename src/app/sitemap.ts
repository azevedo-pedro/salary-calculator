import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://salary-calculator.vercel.app'
  
  return [
    {
      url: `${baseUrl}/pt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
      alternates: {
        languages: {
          'pt-BR': `${baseUrl}/pt`,
          'en-US': `${baseUrl}/en`,
        }
      }
    },
    {
      url: `${baseUrl}/en`, 
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
      alternates: {
        languages: {
          'pt-BR': `${baseUrl}/pt`,
          'en-US': `${baseUrl}/en`,
        }
      }
    }
  ]
}