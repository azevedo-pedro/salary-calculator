'use client';

import React from 'react';
import Script from 'next/script';
import { useLocale } from 'next-intl';

const StructuredData = React.memo(() => {
  const locale = useLocale();

  const generateStructuredData = () => {
    const isPortuguese = locale === 'pt';
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://calculator.azevedodev';
    const currentUrl = `${baseUrl}/${locale}`;
    
    const webApplicationSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "@id": currentUrl,
      "name": isPortuguese ? "Calculadora de Salário" : "Salary Calculator",
      "alternateName": isPortuguese ? "SalaryCalc" : "Calculadora Salarial",
      "description": isPortuguese 
        ? "Calculadora financeira gratuita para distribuir seu salário em categorias como investimentos, gastos fixos e lazer. Planeje suas finanças pessoais de forma eficiente."
        : "Free financial calculator to distribute your salary across categories like investments, fixed costs, and entertainment. Plan your personal finances efficiently.",
      "url": currentUrl,
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web Browser",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "featureList": [
        isPortuguese ? "Distribuição inteligente de salário" : "Smart salary distribution",
        isPortuguese ? "Planejamento financeiro pessoal" : "Personal financial planning",
        isPortuguese ? "Cálculo automático por categorias" : "Automatic calculation by categories",
        isPortuguese ? "Interface responsiva" : "Responsive interface",
        isPortuguese ? "Suporte a múltiplos idiomas" : "Multi-language support",
        isPortuguese ? "Ferramentas de gestão financeira" : "Financial management tools"
      ],
      "inLanguage": isPortuguese ? "pt-BR" : "en-US",
      "audience": {
        "@type": "Audience",
        "audienceType": isPortuguese ? "trabalhadores, profissionais, estudantes" : "workers, professionals, students"
      },
      "author": {
        "@type": "Organization",
        "name": isPortuguese ? "Calculadora de Salário" : "Salary Calculator",
        "url": baseUrl
      },
      "publisher": {
        "@type": "Organization", 
        "name": isPortuguese ? "Calculadora de Salário" : "Salary Calculator",
        "url": baseUrl
      },
      "sameAs": [
        `${baseUrl}/pt`,
        `${baseUrl}/en`
      ],
      "potentialAction": {
        "@type": "UseAction",
        "target": currentUrl,
        "object": {
          "@type": "WebApplication",
          "name": isPortuguese ? "Calculadora de Salário" : "Salary Calculator"
        }
      }
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": isPortuguese ? "Início" : "Home",
          "item": currentUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": isPortuguese ? "Calculadora de Salário" : "Salary Calculator",
          "item": currentUrl
        }
      ]
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": isPortuguese ? "Como usar a calculadora de salário?" : "How to use the salary calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": isPortuguese 
              ? "Digite seu salário líquido mensal e a ferramenta calculará automaticamente quanto você deve alocar para cada categoria: investimentos, gastos fixos, metas, conforto, entretenimento e estudos."
              : "Enter your monthly net salary and the tool will automatically calculate how much you should allocate to each category: investments, fixed costs, goals, comfort, entertainment, and studies."
          }
        },
        {
          "@type": "Question", 
          "name": isPortuguese ? "Qual é a distribuição recomendada?" : "What is the recommended distribution?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": isPortuguese
              ? "Recomendamos: 25% para investimentos, 30% para gastos fixos, 15% para metas, 15% para conforto, 10% para entretenimento e 5% para estudos."
              : "We recommend: 25% for investments, 30% for fixed costs, 15% for goals, 15% for comfort, 10% for entertainment, and 5% for studies."
          }
        }
      ]
    };

    return [webApplicationSchema, breadcrumbSchema, faqSchema];
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateStructuredData()),
      }}
    />
  );
});

StructuredData.displayName = 'StructuredData';

export default StructuredData;