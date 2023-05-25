import "./assets/styles/main.scss";
import { createHigherOrderComponent } from "@wordpress/compose";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, PanelRow } from "@wordpress/components";

import Autocomplete from "./components/ClassAutoCompleter";
import tailwindStrings from "./autocomplete/tailwind.json";
import coreClasses from "./autocomplete/coreframework.json";
import { Button } from "@wordpress/components";

const { useState } = wp.element;

const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const tailwind = tailwindStrings.sort().map((className) => ({
            value: className,
            label: className,
            id: crypto.randomUUID(),
        }));
        const coreFramework = coreClasses.map((className) => ({
            value: className,
            label: className,
            id: crypto.randomUUID(),
        }));
        const [currentFramework, setCurrentFramework] =
            useState("coreFramework");
        return (
            <>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody
                        className={"gp_panel_body"}
                        title="GutenPro ClassManager"
                        initialOpen={true}
                    >
                        {" "}
                        <PanelRow className="block px-4">
                            <p>Choose Framework:</p>
                            <div className="mt-2 flex justify-start gap-2">
                                <Button
                                    className={`${
                                        currentFramework == "tailwind"
                                            ? "bg-indigo-600 font-medium text-white"
                                            : "bg-gray-200"
                                    }`}
                                    onClick={() =>
                                        setCurrentFramework("tailwind")
                                    }
                                >
                                    Tailwind
                                </Button>
                                <Button
                                    className={`${
                                        currentFramework == "coreFramework"
                                            ? "bg-indigo-600 font-medium text-white"
                                            : "bg-gray-200"
                                    }`}
                                    onClick={() =>
                                        setCurrentFramework("coreFramework")
                                    }
                                >
                                    Core Framework
                                </Button>
                            </div>
                        </PanelRow>
                        <PanelRow>
                            <Autocomplete
                                name="cf_classmanager"
                                options={
                                    currentFramework == "tailwind"
                                        ? tailwind
                                        : coreFramework
                                }
                                value={props.attributes.className}
                                triggerPrefix="/"
                                onChange={(event) => {
                                    props.setAttributes({
                                        className: event,
                                    });
                                }}
                            />
                        </PanelRow>
                    </PanelBody>
                </InspectorControls>
            </>
        );
    };
}, "withInspectorControl");

wp.hooks.addFilter(
    "editor.BlockEdit",
    "my-plugin/with-inspector-controls",
    withInspectorControls
);
