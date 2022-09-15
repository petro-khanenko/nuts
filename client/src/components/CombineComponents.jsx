import React from 'react';

const CombineComponents = (...components) =>
    components.reduce(
        (AccumulatedComponents, CurrentComponent) =>
            ({ children }) =>
(
    <AccumulatedComponents>
        <CurrentComponent>{children}</CurrentComponent>
    </AccumulatedComponents>
),
    ({ children }) => <>{children}</>
);

export default CombineComponents;