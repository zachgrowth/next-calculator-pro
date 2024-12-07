'use client'

import Script from 'next/script'
import { seoConfig } from '@/configs/seo.config'

export function Analytics() {
  const { googleAnalytics, baiduAnalytics } = seoConfig.analytics
  const { googleAdsense } = seoConfig.advertising

  const handleAdSenseError = (e: Error) => {
    console.error('AdSense script failed to load:', e);
  };

  return (
    <>
      {/* Google Analytics */}
      {googleAnalytics?.gtag && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalytics.id}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalytics.id}');
            `}
          </Script>
        </>
      )}

      {/* Baidu Analytics */}
      {baiduAnalytics?.id && (
        <Script id="baidu-analytics" strategy="afterInteractive">
          {`
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?${baiduAnalytics.id}";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();
          `}
        </Script>
      )}

      {/* Google AdSense */}
      {googleAdsense?.id && (
        <>
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${googleAdsense.id}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
            onError={handleAdSenseError}
          />
          {googleAdsense.autoAds && (
            <Script id="google-adsense-init" strategy="afterInteractive">
              {`
                try {
                  if (typeof window.adsbygoogle === 'undefined') {
                    window.adsbygoogle = [];
                  }
                  if (!window.adsbygoogle.loaded) {
                    window.adsbygoogle.push({
                      google_ad_client: "${googleAdsense.id}",
                      enable_page_level_ads: true
                    });
                    window.adsbygoogle.loaded = true;
                  }
                } catch (err) {
                  console.error('AdSense initialization error:', err);
                }
              `}
            </Script>
          )}
        </>
      )}
    </>
  )
} 