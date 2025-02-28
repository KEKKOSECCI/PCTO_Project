<template>
    <SideBar/>
    <Details :id="this.id" :type="this.type" ></Details>
</template>
<script>
import Details from '../components/details.vue';
import SideBar from '../components/SideBar.vue';

export default{
    components:{
        Details,SideBar
    },
    props:{
        id:{type:Number,required:true},
        slug:{type:String,required:true},
        type:{type:String,required:true}
    }
}

</script>