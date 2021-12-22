import * as React from 'react';

export const SimpleArray = ({source, record = {}}) =>
  <>
    {
      record[source].map((item) => <>{item}, </>)
    }
  </>;

export const AttributesField = ({source, record = {}}) => (
  <>
      {record[source].map(item => (<>{item.name}, </>))}
  </>
)
