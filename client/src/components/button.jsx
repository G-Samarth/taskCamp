import React from 'react';

const Button = ({children, ...props}) => (
    <div {...props}>{children}</div>
);

export default Button;
