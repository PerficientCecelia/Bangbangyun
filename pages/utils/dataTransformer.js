var dataTransformer={

   userInfo:function(data){
      
   },

   trimString(data){
     return data.replace(/(^\s*)|(\s*)$/g, "");
   }


}

export default dataTransformer;