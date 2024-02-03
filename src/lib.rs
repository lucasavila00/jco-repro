mod bindings;

use bindings::Guest;

struct Component;

impl Guest for Component {
    fn transform_html(
        _input: wit_bindgen::rt::string::String,
        _config: bindings::TransformHtmlConfig,
    ) -> bindings::BlocksAndImages {
        todo!()
    }
}
