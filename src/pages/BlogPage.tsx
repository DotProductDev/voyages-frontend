import React from 'react';
import HeaderLogoSearch from '../components/header/HeaderSearchLogo';
import LOADINGLOGO from '@/assets/sv-logo_v2_notext.svg';
const BlogPage: React.FC = () => {
  return (
    <>
      <HeaderLogoSearch />
      <div style={{ marginTop: '15%', textAlign: 'center' }}>
        <div>BlogPage is coming soon</div>
        <img
          src={LOADINGLOGO}
          alt="document"
          style={{ width: '30%', padding: '5%' }}
        />
      </div>
    </>
  );
};

export default BlogPage;