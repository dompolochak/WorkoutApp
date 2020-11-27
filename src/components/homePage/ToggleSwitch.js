
import React from 'react';
import '../../styles/HomePage/ToggleSwitch.css';

/**
 *  This is a reusable toggle switch component.  It's on/off state and toggle must be provided by the parent / user
 *
 * @param props
 * Required Props:
 *      onState (Boolean), true if toggle is active, false if toggle is inactive
 *      toggleOn (Function callback) for toggling on and off, can have one parameter for setting true / false
 *      height: as an int will be converted to px. This follows bootstrap breakpoint styling and height should be given
 *           as the following:
 *               xsHeight, smHeight, mdHeight, lgHeight, or xlHeight
 *           At a minimum xsHeight needs to be given, larger screen sizes will fall back on the next largest available size like bootstrap
 *      width: as an int will be converted to px.  See description for height as it works the same.  Can be given as:
 *          xsWidth, smWidth, mdWidth, lgWidth, or xlWidth
 *      margin: specifies the margins and can be given as a string replicating CSS margin properties. Works the same as width, and height
 *          options: xsMargin, smMargin, mdMargin, lgMargin, or xlMargin
 *      inactiveColor: a css color for the background when the toggle switch is inactive
 *      activeColor: a css color for the background when the toggle switch is active
 * @returns {JSX.Element}
 * @constructor
 */

const formFactorMapping = {
    xs: 0,
    sm: 350,
    md: 576,
    lg: 768,
    xl: 992
}

export default function ToggleSwitch(props) {
    const [formFactor, setFormFactor] = React.useState({
        // Default values will immediately be overwritten by window resize hook
        height: 1,
        width: 1,
        margin: ''
    });

    // Window resize hook
    React.useEffect(() => {
        function handleResize() {
            const newWindowWidth = window.innerWidth;

            // Determine the sizes to use based on form factors provided in props
            if(newWindowWidth > formFactorMapping.xl) {
                // If the xl prop is undefined, fall back on the next largest available style
                setFormFactor(
                    {
                        height: props.xlHeight || props.lgHeight || props.mdHeight || props.smHeight || props.xsHeight,
                        width: props.xlWidth || props.lgWidth || props.mdWidth || props.smWidth || props.xsWidth,
                        margin: props.xlMargin || props.lgMargin || props.mdMargin || props.smMargin || props.xsMargin
                    }
                );
            }
            else if(newWindowWidth > formFactorMapping.lg) {
                setFormFactor(
                    {
                        height: props.lgHeight || props.mdHeight || props.smHeight || props.xsHeight,
                        width: props.lgWidth || props.mdWidth || props.smWidth || props.xsWidth,
                        margin: props.lgMargin || props.mdMargin || props.smMargin || props.xsMargin
                    }
                );
            }
            else if(newWindowWidth > formFactorMapping.md) {
                setFormFactor(
                    {
                        height: props.mdHeight || props.smHeight || props.xsHeight,
                        width: props.mdWidth || props.smWidth || props.xsWidth,
                        margin: props.mdMargin || props.smMargin || props.xsMargin
                    }
                );
            }
            else if(newWindowWidth > formFactorMapping.sm) {
                setFormFactor(
                    {
                        height: props.smHeight || props.xsHeight,
                        width: props.smWidth || props.xsWidth,
                        margin: props.smMargin || props.xsMargin
                    }
                );
            }
            else {
                setFormFactor(
                    {
                        height: props.xsHeight,
                        width: props.xsWidth,
                        margin: props.xsMargin
                    }
                );
            }
        }

        // Add the event listener for window size
        window.addEventListener("resize", handleResize);

        // Get initial form factor values
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, [props]); // Empty array so effect is only run on mount


    const switchContainerStyle={
        height: formFactor.height,
        width: formFactor.width,
        margin: formFactor.margin || ''
    };

    const toggleButtonOff = {
        height: formFactor.height - 4,
        width: formFactor.height - 4
    }

    const toggleButtonOn = {
        height: formFactor.height - 4,
        width: formFactor.height - 4,
        transform: `translateX(${formFactor.width - formFactor.height}px)`
    }

    return (
        <label className={"toggleSwitch" + (props.onState ? ' toggledOn' : '')}
               style={switchContainerStyle}
               onClick={props.toggleOn}>
            <span className="slider" style={{backgroundColor: (props.onState ? props.activeColor : props.inactiveColor)}}>
                <span className="toggleBubble" style={props.onState ? toggleButtonOn : toggleButtonOff}/>
            </span>
        </label>
    );
}