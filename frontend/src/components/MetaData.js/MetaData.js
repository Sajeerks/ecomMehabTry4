import React from "react";
import { Helmet } from 'react-helmet-async';

const MetaData = ({ title }) => {
  return (
    <div className="application">
      <Helmet>
        <title>{title}</title>
      </Helmet>
    
    </div>
  );
};

export default MetaData;
