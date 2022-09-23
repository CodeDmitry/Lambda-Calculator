"use strict"

// | Note, this file requires glm_1.js to be loaded before it.

var vec2 = function vec3() {
    var value = new Float32Array(2);
    this.value = value;
}
var vec3 = function vec3() {
    var value = vec3_create.apply(null, arguments);
    this.value = value;
}
var vec4 = function vec4() {
    var value = vec4_create.apply(null, arguments);
    this.value = value;
}
var mat2 = function mat2() {
    var value = new Float32Array(4);
    this.value = value;
}
var mat3 = function mat3() {
    var value = mat3_create.apply(null, arguments);
    this.value = value;
}
var mat4 = function mat4() {
    var value = mat4_create.apply(null, arguments);
    this.value = value;
}



