import type { Meta, StoryObj } from '@storybook/web-components';

import '../index';

interface ButtonPros {
  variant: string,
  outline: boolean,
  disabled: boolean,
  slot: string,
}

const renderComponent = (params: any) => {
  console.log(params)
  return `
    <bsi-button 
      variant="${params.variant}"
      ${params.disabled ? 'disabled' : ''}
      ${params.outline ? 'outline' : ''}
      >${params.slot}</bsi-button>
  `
}

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/Button',
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
