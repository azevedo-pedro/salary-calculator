import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Metadata } from 'next';

// Dynamic metadata generation
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }> | { locale: string };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  
  const isPortuguese = locale === 'pt';
  
  const seoData = {
    pt: {
      title: "Calculadora de Salário | Distribua Seu Salário de Forma Inteligente",
      description: "Calculadora financeira gratuita para distribuir seu salário em categorias como investimentos, gastos fixos e lazer. Planeje suas finanças pessoais de forma eficiente.",
      keywords: "calculadora salário, planejamento financeiro, distribuição salário, investimentos, finanças pessoais, gestão financeira, orçamento pessoal",
      openGraph: {
        title: "Calculadora de Salário - Planejamento Financeiro Inteligente",
        description: "Distribua seu salário de forma inteligente em categorias como investimentos, gastos fixos e lazer. Ferramenta gratuita de planejamento financeiro.",
        locale: 'pt_BR',
        alternateLocale: 'en_US'
      }
    },
    en: {
      title: "Salary Calculator | Smart Salary Distribution Tool",
      description: "Free financial calculator to distribute your salary across categories like investments, fixed costs, and entertainment. Plan your personal finances efficiently.",
      keywords: "salary calculator, financial planning, salary distribution, investments, personal finance, financial management, personal budget",
      openGraph: {
        title: "Salary Calculator - Smart Financial Planning",
        description: "Intelligently distribute your salary across categories like investments, fixed costs, and entertainment. Free financial planning tool.",
        locale: 'en_US',
        alternateLocale: 'pt_BR'
      }
    }
  };

  const currentLang = isPortuguese ? 'pt' : 'en';
  const data = seoData[currentLang];

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      title: data.openGraph.title,
      description: data.openGraph.description,
      locale: data.openGraph.locale,
      alternateLocale: data.openGraph.alternateLocale,
      siteName: currentLang === 'pt' ? 'Calculadora de Salário' : 'Salary Calculator',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.openGraph.title,
      description: data.openGraph.description,
    },
    alternates: {
      languages: {
        'pt-BR': '/pt',
        'en-US': '/en',
      },
    },
    other: {
      'theme-color': '#3B82F6',
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}