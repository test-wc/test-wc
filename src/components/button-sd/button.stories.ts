import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from "lit";

import './button'

interface ButtonPros {
  variant: string,
  outline: boolean,
  disabled: boolean,
  slot: string,
}

const renderComponent = (params: any) => {
  return html`
    <bsi-button 
      variant="${params.variant}"
      ?disabled="${params.disabled}"
      ?outline="${params.outline}"
      >${params.slot}</bsi-button>
  `
}

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/Button',
  tags: ['autodocs'],
  component: 'bsi-button',
  render: (args) => renderComponent(args),
  args: {
      slot: 'Testo bottone',
      variant: 'primary',
      outline: false,
      disabled: false
  },
  argTypes: {
    variant: { 
      control: 'select',
      description: 'Overwritten description',
      options: ['primary', 'success', 'warning', 'danger']
    },
    disabled: { 
      control: 'boolean',
      type: 'boolean'
    },
    outline: { 
      control: 'boolean',
      type: 'boolean'
    },
    slot:  { 
      control: 'text',
    },
  },
} satisfies Meta<ButtonPros>;

export default meta;
type Story = StoryObj<ButtonPros>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
  },
};
