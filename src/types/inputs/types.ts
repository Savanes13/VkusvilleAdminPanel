export interface IInputDefaultProps {
  value: string,
  validity: boolean,
  label: string,
  placeholder: string,
  error: {
    show: boolean,
    text: string
  },
};

export interface IInputPasswordProps {
  value: string,
  label: string,
  placeholder: string,
  error: {
    show: boolean,
    text: string
  }
};