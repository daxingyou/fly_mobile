<template>
	<div class="nav" >
        <slot></slot>
    </div>
</template>

<script>
	
	export default {
        data() {
            return {
                openIndex: null,
                openChildIndex:null,
                
            }
        },
        methods: {
            open(uid,name,activeIndex) {
            	if(this.openIndex === name&&this.openChildIndex === activeIndex){
            		this.$children[this.openIndex].show = !this.$children[this.openIndex].show;
            		return 
            	}
            	this.openChildIndex = activeIndex;
            	this.openIndex  = name;
                this.$children.forEach((item,index) => {
                    if (item._uid === uid) {
                    	index === name ? item.show = true :item.show = false;
                    } else {
                        item.show = false;
                    }
                });
            },
            result(data){
            	this.$emit("result",data)
            },
            enterChart(data){
            	this.$emit("enterChart",data)
            }
        }
    }
</script>

<style>
</style>