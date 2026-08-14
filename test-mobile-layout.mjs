import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:3001';

async function testViewport(width, height, label) {
  const browser = await chromium.launch();
  const context = await browser.createContext({ 
    viewport: { width, height },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();
  
  try {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    
    // Get layout metrics
    const metrics = await page.evaluate(() => {
      const main = document.querySelector('main');
      const topRow = document.querySelector('div[class*="fixed"][class*="top-0"]');
      const contentDiv = main?.querySelector(':scope > div:not([class*="bg-"])');
      const hero = main?.querySelector('h1');
      const nav = topRow?.querySelector(':scope > div');
      
      // Check for dark bars (empty space)
      const mainComputedStyle = window.getComputedStyle(main);
      
      return {
        viewport: { width: window.innerWidth, height: window.innerHeight },
        main: main ? {
          offsetWidth: main.offsetWidth,
          computedWidth: mainComputedStyle.width,
          paddingLeft: mainComputedStyle.paddingLeft,
          paddingRight: mainComputedStyle.paddingRight,
          marginLeft: mainComputedStyle.marginLeft,
          marginRight: mainComputedStyle.marginRight,
          overflow: mainComputedStyle.overflow,
          overflowX: mainComputedStyle.overflowX,
          position: mainComputedStyle.position
        } : null,
        topRow: topRow ? {
          offsetWidth: topRow.offsetWidth,
          computedWidth: window.getComputedStyle(topRow).width,
          position: window.getComputedStyle(topRow).position,
          zIndex: window.getComputedStyle(topRow).zIndex
        } : null,
        contentDiv: contentDiv ? {
          offsetWidth: contentDiv.offsetWidth,
          maxWidth: window.getComputedStyle(contentDiv).maxWidth,
          paddingLeft: window.getComputedStyle(contentDiv).paddingLeft,
          paddingRight: window.getComputedStyle(contentDiv).paddingRight
        } : null,
        hero: hero ? {
          offsetWidth: hero.offsetWidth,
          fontSize: window.getComputedStyle(hero).fontSize
        } : null,
        nav: nav ? {
          offsetWidth: nav.offsetWidth,
          display: window.getComputedStyle(nav).display,
          gap: window.getComputedStyle(nav).gap
        } : null,
        bodyWidth: document.body.offsetWidth,
        htmlWidth: document.documentElement.offsetWidth,
        documentWidth: document.documentElement.clientWidth,
        windowWidth: window.innerWidth,
        // Check if nav pills wrap properly
        navPills: Array.from(topRow?.querySelectorAll('a, div[class*="gap"]') || []).map(el => ({
          tag: el.tagName,
          width: el.offsetWidth,
          text: el.textContent?.substring(0, 20)
        }))
      };
    });
    
    // Take screenshot
    const screenshotPath = path.join(process.cwd(), `mobile-${label}-${width}px.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    
    return {
      label,
      viewport: { width, height },
      metrics,
      screenshot: screenshotPath,
      passed: true
    };
  } catch (error) {
    return {
      label,
      viewport: { width, height },
      error: error.message,
      passed: false
    };
  } finally {
    await context.close();
    await browser.close();
  }
}

async function runTests() {
  console.log('Testing mobile layout at different viewport sizes...\n');
  
  const results = [];
  
  // Test at 375px (iPhone SE)
  results.push(await testViewport(375, 812, 'iPhone-SE'));
  console.log('✓ Tested 375px viewport');
  
  // Test at 390px (iPhone 12)
  results.push(await testViewport(390, 844, 'iPhone-12'));
  console.log('✓ Tested 390px viewport');
  
  // Test at 480px (Older Android)
  results.push(await testViewport(480, 854, 'Android-480px'));
  console.log('✓ Tested 480px viewport');
  
  // Test at 768px (Tablet)
  results.push(await testViewport(768, 1024, 'Tablet-768px'));
  console.log('✓ Tested 768px viewport\n');
  
  // Analyze results
  console.log('=== LAYOUT TEST RESULTS ===\n');
  
  results.forEach(result => {
    if (result.passed) {
      const m = result.metrics;
      console.log(`📱 ${result.label} (${result.viewport.width}x${result.viewport.height})`);
      console.log(`   Viewport width: ${m.viewport.width}px`);
      console.log(`   Main width: ${m.main?.offsetWidth}px`);
      console.log(`   Content div max-width: ${m.contentDiv?.maxWidth}`);
      console.log(`   Content div padding: ${m.contentDiv?.paddingLeft} left, ${m.contentDiv?.paddingRight} right`);
      
      // Check for issues
      const issues = [];
      if (m.main?.offsetWidth < result.viewport.width * 0.9) {
        issues.push(`⚠️  Main width (${m.main.offsetWidth}px) is less than 90% of viewport (${result.viewport.width}px) - dark bars detected`);
      }
      if (m.contentDiv?.maxWidth && m.contentDiv.maxWidth !== '100%' && m.viewport.width < 768) {
        issues.push(`⚠️  Content div has max-width constraint on mobile: ${m.contentDiv.maxWidth}`);
      }
      
      if (issues.length > 0) {
        issues.forEach(i => console.log(`   ${i}`));
      } else {
        console.log('   ✓ No layout issues detected');
      }
      console.log(`   Screenshot: ${result.screenshot}`);
    } else {
      console.log(`❌ ${result.label}: ${result.error}`);
    }
    console.log();
  });
  
  console.log('Tests completed!');
}

runTests().catch(console.error);
