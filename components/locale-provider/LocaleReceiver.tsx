import React from 'react';
import PropTypes from 'prop-types';

export interface LocaleReceiverProps {
  componentName: string;
  defaultLocale: object;
  children: (locale) => React.ReactElement<any>;
}

export interface LocaleReceiverContext {
  antLocale?: { [key: string]: any };
}

export default class LocaleReceiver extends React.Component<LocaleReceiverProps> {
  static contextTypes = {
    antLocale: PropTypes.object,
  };

  context: LocaleReceiverContext;

  getLocale() {
    const { componentName, defaultLocale } = this.props;
    const { antLocale } = this.context;
    const localeFromContext = antLocale && antLocale[componentName];
    return {
      ...defaultLocale,
      ...(localeFromContext || {}),
    };
  }

  render() {
    return this.props.children(this.getLocale());
  }
}
