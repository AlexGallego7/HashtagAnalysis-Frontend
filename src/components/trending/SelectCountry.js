import React, { useState } from 'react';
import ReactFlagsSelect from 'react-flags-select';

const SelectCountry = (props) => {

    const dict = {
        "US": "2459115",
        "CA": "4118",
        "GB": "44418",
        "FR": "615702",
        "ES": "766273",
        "IT": "721943",
        "DE": "638242",
        "AR": "468739",
        "BR": "455825",
        "IE": "560743",
        "NL": "727232",
        "CH": "784794"
    }

    const [selected, setSelected] = useState('');

    const selectChanged = (code) => {
        setSelected(code)
        props.parentCallback(dict[code])
    }

    return (
            <ReactFlagsSelect
                selected={selected}
                onSelect={code => selectChanged(code)}
                countries={["US", "GB", "FR", "DE", "IT", "ES", "AD", "AR", "BE", "BR", "CA", "IE", "NL", "CH"]}
                searchable
            />)
}

export default SelectCountry;