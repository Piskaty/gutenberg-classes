import { __ } from "@wordpress/i18n";
import { RichText } from "@wordpress/block-editor";

const Autocomplete = ({
    value,
    onChange,
    options,
    name,
    triggerPrefix = "/",
    ...props
}) => {
    const autoConfigs = [
        {
            name: name,
            triggerPrefix: triggerPrefix,
            options: options,
            isDebounced: true,
            // Maybe work with classes to color code the suggestions like Padding=Blue and so on
            getOptionLabel: (option) => (
                <div className="cf__class__suggestion">{option.label}</div>
            ),
            getOptionKeywords: (option) => [option.label, option.value],
            getOptionCompletion: (option) => option.value,
        },
    ];

    return (
        <RichText
            {...props}
            autocompleters={autoConfigs}
            value={value}
            onChange={onChange}
            className="gp-autocomplete"
            placeholder={__(
                `Type ${autoConfigs[0].triggerPrefix} to choose a Class`
            )}
        />
    );
};

export default Autocomplete;
