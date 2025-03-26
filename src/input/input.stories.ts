import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from "lit";

import './input'

interface InputPros {

}

const renderComponent = (params: any) => {
  return html`
    <bsi-input label="La mia label"></bsi-input>
  `
}

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/Input',
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
} satisfies Meta<InputPros>;

export default meta;
type Story = StoryObj<InputPros>;

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
