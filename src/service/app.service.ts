import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
@Injectable()
export class AppService {
  async scan(url: string): Promise<Array<any>> {
    const results: Array<string> = [];
    // load the browser
    const browser = await puppeteer.launch();
    // grab a page controller
    const page = await browser.newPage();
    // attach to the console for the results 
    page.on('console', (msg) => {
      results.push(msg.text());
    });
 
    // go to the url
    await page.goto(url);
    // add the script to puppeteer page
    await page.addScriptTag({
      path: './node_modules/html_codesniffer/build/HTMLCS.js',
    });
    let HTMLCS_RUNNER; // to avoid the error from it not being defined below
    await page.evaluate(function () {
      HTMLCS_RUNNER.run('WCAG2A');
    });
    console.dir(results, {'maxArrayLength': null});
    await browser.close();
    return results;
  }
}
