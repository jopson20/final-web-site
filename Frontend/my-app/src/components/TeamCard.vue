<template>
   
    <div class="card text-white bg-dark">
        <div class="d-flex justify-content-center p-2">
            <img :src="member.image" alt="Foto equipo" height="200" width="200">
            
        </div>
        <div class="card-body">
            <h5 class="card-title text-center ">{{member.nombre}}</h5>
            <br>
            <p class="card-text text-justify"> {{member.descripcion}}</p>
        </div>
        <div class="card-footer">
            <small class="text-white" > {{member.codigo}}. {{member.rol}}</small>
        </div>
    </div>

</template>

<script>
    export default {
        name: "TeamCard",
        props:['member']
    }
</script>

<style>

</style>
