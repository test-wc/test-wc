import './button.js';
import { expect, fixture, html } from '@open-wc/testing';
import { Button } from './button.js';

describe('Button component', () => {
  describe('accessibility', () => {
    it('default is accessible', async () => {
      const el = await fixture<Button>(html`<bsi-button-sd>My Button</bsi-button-sd>`);
      await expect(el).to.be.accessible();
    });

    it('variations are accessible', async () => {
      const el = await fixture<Button>(html`
        <bsi-button-sd variation="primary">bsi Button</bsi-button-sd>
        <bsi-button-sd variation="hollow">bsi Button</bsi-button-sd>
        <bsi-button-sd variation="transparent">bsi Button</bsi-button-sd>
      `);
      await expect(el).to.be.accessible();
    });

    it('disabled is accessible', async () => {
      const el = await fixture<Button>(html`<bsi-button-sd disabled>bsi Button</bsi-button-sd>`);
      const button = el.shadowRoot?.querySelector('button');

      await expect(el).to.be.accessible();
      await expect(button?.hasAttribute('disabled')).to.be.true;
    });
  });
});
