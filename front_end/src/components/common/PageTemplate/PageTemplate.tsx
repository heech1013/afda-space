import React from 'react';
import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';

import HeaderContainer from 'containers/common/HeaderContainer';

interface PageTemplateProps {
  children: React.ReactNode
}

const cx = classNames.bind(styles);

function PageTemplate({children}: PageTemplateProps) {
  return <div className={cx('page-template')}>
    <HeaderContainer/>
    <main>
      {children}
    </main>
  </div>
};

export default PageTemplate;