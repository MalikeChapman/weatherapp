/* eslint-disable */
export const apiSearch = (function ()
{
    const elevalue = document.getElementById("weatherCity").value;
  
    function valid()
    {
        console.log(this);
        const test = document.getElementById("weatherCity");
        if (test.value === '')
        {
            alert('This can not be blank!');
            console.log("bad");
            return;
        } 
        else
        {
            test.setCustomValidity("");
            console.log("good!")
            alert("good to go!");
        }
    
    }
    // if (elevalue === '')
    // {
    //     document.getElementById('weatherCity').setCustomValidity
    // }
    return {valid};

})(document)