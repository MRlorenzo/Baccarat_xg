<template>
    <div>
        <table>
            <tr v-for="ps of pointList">
                <td v-for="p of ps">
                    <div v-if="p != null">
                        <p> ({{p.x}}:{{p.y}})</p> [{{p.z && p.z.result.getName()}}]
                    </div>
                </td>
            </tr>
        </table>

        <div v-for="s of squeezeList">
            {{s.getLocation()}} tie: {{s.tie.length}} {{s.z && s.z.result.getName()}}
        </div>
    </div>
</template>

<script>
	import Road from '../baccarat/road2/Road';
	export default {
		name: "demo",
        data(){
			return {
				road: new Road()
            }
        },
        computed: {
			pointList(){
				return this.road.pointList;
            },
            squeezeList(){
				return this.road.squeezeList;
            }
        },
        created(){
			window.road = this.road;
        }
	}
</script>

<style scoped>

</style>