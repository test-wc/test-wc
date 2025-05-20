import './button.js';
import { expect, fixture, html } from '@open-wc/testing';
import { Button } from './button.js';

describe('Button component', () => {
  describe('accessibility', () => {
    it('default is accessible', async () => {
      const el = await fixture<Button>(html`<bsi-button>My Button</bsi-button>`);
      await expect(el).to.be.accessible();
    });

    it('variations are accessible', async () => {
      const el = await fixture<Button>(html`
        <bsi-button variation="primary">bsi Button</bsi-button>
        <bsi-button variation="hollow">bsi Button</bsi-button>
        <bsi-button variation="transparent">bsi Button</bsi-button>
      `);
      await expect(el).to.be.accessible();
    });

    it('disabled is accessible', async () => {
      const el = await fixture<Button>(html`<bsi-button disabled>bsi Button</bsi-button>`);
      const button = el.shadowRoot?.querySelector('button');

      await expect(el).to.be.accessible();
      await expect(button?.hasAttribute('disabled')).to.be.true;
    });
  });
});
