/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function Grouped({category,list,label,error,onInput}) {
  const options = list.map((option) => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  return (
    <Autocomplete
      id="grouped-demo"
      onChange={(e,newValue)=>{onInput(newValue.title);}}
      options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      groupBy={category?(option) => option.firstLetter:null}
      getOptionLabel={(option)=>option.title}
      style={{ width: '100%' }}
      renderInput={(params) => <TextField {...params} error={error} label={label} variant="outlined"  InputLabelProps={{
            shrink: true,
          }}/>}
    />
  );
}

const medicine=[
  {title:'abc'},
  {title:'labc'},
  {title:'kabc'},
  {title:'habc'},
  {title:'rtabc'},
  {title:'weabc'},
  {title:'qabc'},
  {title:'c'},
  {title:'bc'}
];