// glMatrix v0.9.5-altered
"use strict";

if (!('Float32Array' in window)) {
    throw new Error('Missing dependency: Float32Array.');
}

var sqrt = Math.sqrt.bind(Math);
var pow = Math.pow.bind(Math);

var vec3_default = new Float32Array(3);

function vec3_create() {     
    var result = vec3_default.slice();

    if (arguments.length) { 
        if (typeof arguments[0] !== 'object') {
            result.set(arguments);
        } else {
            result.set.apply(result, arguments);
        }
    }
        
    return result;
}

function vec3_set(dst, src) {    
    dst.set(src);
}

function vec3_add(dst, src) {
    dst[0] += src[0];
    dst[1] += src[1];
    dst[2] += src[2];
}

function vec3_subtract(dst, src) {
    dst[0] -= src[0];
    dst[1] -= src[1];
    dst[2] -= src[2];
}

function vec3_negate(dst) {    
    dst[0] = -dst[0];
    dst[1] = -dst[1];
    dst[2] = -dst[2];    
}

function vec3_scale(dst, coeff) {
    dst[0] *= coeff;
    dst[1] *= coeff;
    dst[2] *= coeff;
}

function vec3_fastLength(x, y, z) {
    return sqrt(x*x + y*y + z*z);
}

function vec3_length(v) {
    var x = v[0];
    var y = v[1];
    var z = v[2];
    
    return sqrt(x*x + y*y + z*z);
}

function vec3_fastNormalize(a1, a2, a3)
{
    var length = sqrt(a1 * a1 + a2 * a2 + a3 * a3);

    return vec3_create (
        a1 / length,
        a2 / length,
        a3 / length
    );
}

// a normalized vec3 is a vec3 X such that
// sqrt(x[0]**2 + x[1]**2 + x[2]**2) = 1.
// this is impossible if the vector is null.
function vec3_normalize(dst) {
    var a1 = dst[0];
    var a2 = dst[1];
    var a3 = dst[2];

    var length = sqrt(a1*a1 + a2*a2 + a3*a3);
    
    return vec3_create (
        a1 / length,
        a2 / length,
        a3 / length
    );
}   

function vec3_fastCross(a1, a2, a3, b1, b2, b3) {
    return vec3_create (
        a2*b3 - a3*b2,
        a3*b1 - a1*b3,
        a1*b2 - a2*b1
    );        
}

function vec3_cross(a, b) {
    var a1 = a[0];
    var a2 = a[1];
    var a3 = a[2];
    var b1 = b[0];
    var b2 = b[1];
    var b3 = b[2];

    return vec3_create (
        a2*b3 - a3*b2,
        a3*b1 - a1*b3,
        a1*b2 - a2*b1
    );    
}

function vec3_fastDot(u1, u2, u3, v1, v2, v3)
{
    return u1*u1 + u2*v2 + u3*v3;    
}

function vec3_dot(u, v) {
    return u[0]*v[0] + u[1]*v[1] + u[2]*v[2];
};

function vec3_direction(src, dst) {
    var result = vec3_create(dst);
    vec3_subtract(result, src);
    return result;
}


// Linearly interpolates between two vectors.
function vec3_lerp(a, b, c, d) {
    d || (d = a);
    d[0] = a[0] + c * (b[0] - a[0]);
    d[1] = a[1] + c * (b[1] - a[1]);
    d[2] = a[2] + c * (b[2] - a[2]);
    return d
};


function vec3_str(a) {
    return JSON.stringify(a);
}


var mat3_create = function(a) {
    var b = new Float32Array(9);
    if (a) {
        b[0] = a[0];
        b[1] = a[1];
        b[2] = a[2];
        b[3] = a[3];
        b[4] = a[4];
        b[5] = a[5];
        b[6] = a[6];
        b[7] = a[7];
        b[8] = a[8];
        b[9] = a[9]
    }
    return b
};

var mat3_set = function(a, b) {
    b[0] = a[0];
    b[1] = a[1];
    b[2] = a[2];
    b[3] = a[3];
    b[4] = a[4];
    b[5] = a[5];
    b[6] = a[6];
    b[7] = a[7];
    b[8] = a[8];
    return b
};

var mat3_identity = function(a) {
    a[0] = 1;
    a[1] = 0;
    a[2] = 0;
    a[3] = 0;
    a[4] = 1;
    a[5] = 0;
    a[6] = 0;
    a[7] = 0;
    a[8] = 1;
    return a
};

var mat3_transpose = function(a, b) {
    if (!b || a == b) {
        var c = a[1],
            d = a[2],
            e = a[5];
        a[1] = a[3];
        a[2] = a[6];
        a[3] = c;
        a[5] = a[7];
        a[6] = d;
        a[7] = e;
        return a
    }
    b[0] = a[0];
    b[1] = a[3];
    b[2] = a[6];
    b[3] = a[1];
    b[4] = a[4];
    b[5] = a[7];
    b[6] = a[2];
    b[7] = a[5];
    b[8] = a[8];
    return b;
};
var mat3_toMat4 = function(a, b) {
    b || (b = mat4_create());
    b[0] = a[0];
    b[1] = a[1];
    b[2] = a[2];
    b[3] = 0;
    b[4] = a[3];
    b[5] = a[4];
    b[6] = a[5];
    b[7] = 0;
    b[8] = a[6];
    b[9] = a[7];
    b[10] = a[8];
    b[11] = 0;
    b[12] = 0;
    b[13] = 0;
    b[14] = 0;
    b[15] = 1;
    return b
};

var mat3_str = function(a) {
    return "[" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + "]"
};
var mat4 = {};
var mat4_create = function(a) {
    var b = new Float32Array(16);
    if (a) {
        b.set(a);
    }
    return b
};
var mat4_set = function(a, b) {
    b.set(a);
    return b
};

var mat4__identity = new Float32Array([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
]);

var mat4_identity = function(a) {
    a.set(mat4__identity);
    return a;
};

var mat4_createIdentity = function() {
    return mat4__identity.slice();
};

var mat4_transpose = function(a, b) {
    if (!b || a == b) {
        var c = a[1],
            d = a[2],
            e = a[3],
            g = a[6],
            f = a[7],
            h = a[11];
        a[1] = a[4];
        a[2] = a[8];
        a[3] = a[12];
        a[4] = c;
        a[6] = a[9];
        a[7] = a[13];
        a[8] = d;
        a[9] = g;
        a[11] = a[14];
        a[12] = e;
        a[13] = f;
        a[14] = h;
        return a
    }
    b[0] = a[0];
    b[1] = a[4];
    b[2] = a[8];
    b[3] = a[12];
    b[4] = a[1];
    b[5] = a[5];
    b[6] = a[9];
    b[7] = a[13];
    b[8] = a[2];
    b[9] = a[6];
    b[10] = a[10];
    b[11] = a[14];
    b[12] = a[3];
    b[13] = a[7];
    b[14] = a[11];
    b[15] = a[15];
    return b
};
var mat4_determinant = function(a) {
    var b = a[0],
        c = a[1],
        d = a[2],
        e = a[3],
        g = a[4],
        f = a[5],
        h = a[6],
        i = a[7],
        j = a[8],
        k = a[9],
        l = a[10],
        o = a[11],
        m = a[12],
        n = a[13],
        p = a[14];
    a = a[15];
    return m * k * h * e - j * n * h * e - m * f * l * e + g * n * l * e + j * f * p * e - g * k * p * e - m * k * d * i + j * n * d * i + m * c * l * i - b * n * l * i - j * c * p * i + b * k * p * i + m * f * d * o - g * n * d * o - m * c * h * o + b * n * h * o + g * c * p * o - b * f * p * o - j * f * d * a + g * k * d * a + j * c * h * a - b * k * h * a - g * c * l * a + b * f * l * a
};
var mat4_inverse = function(a, b) {
    b || (b = a);
    var c = a[0],
        d = a[1],
        e = a[2],
        g = a[3],
        f = a[4],
        h = a[5],
        i = a[6],
        j = a[7],
        k = a[8],
        l = a[9],
        o = a[10],
        m = a[11],
        n = a[12],
        p = a[13],
        r = a[14],
        s = a[15],
        A = c * h - d * f,
        B = c * i - e * f,
        t = c * j - g * f,
        u = d * i - e * h,
        v = d * j - g * h,
        w = e * j - g * i,
        x = k * p - l * n,
        y = k * r - o * n,
        z = k * s - m * n,
        C = l * r - o * p,
        D = l * s - m * p,
        E = o * s - m * r,
        q = 1 / (A * E - B * D + t * C + u * z - v * y + w * x);
    b[0] = (h * E - i * D + j * C) * q;
    b[1] = (-d * E + e * D - g * C) * q;
    b[2] = (p * w - r * v + s * u) * q;
    b[3] = (-l * w + o * v - m * u) * q;
    b[4] = (-f * E + i * z - j * y) * q;
    b[5] = (c * E - e * z + g * y) * q;
    b[6] = (-n * w + r * t - s * B) * q;
    b[7] = (k * w - o * t + m * B) * q;
    b[8] = (f * D - h * z + j * x) * q;
    b[9] = (-c * D + d * z - g * x) * q;
    b[10] = (n * v - p * t + s * A) * q;
    b[11] = (-k * v + l * t - m * A) * q;
    b[12] = (-f * C + h * y - i * x) * q;
    b[13] = (c * C - d * y + e * x) * q;
    b[14] = (-n * u + p * B - r * A) * q;
    b[15] = (k * u - l * B + o * A) * q;
    return b
};

var mat4_toRotationMat = function(a, b) {
    b || (b = mat4_create());
    b[0] = a[0];
    b[1] = a[1];
    b[2] = a[2];
    b[3] = a[3];
    b[4] = a[4];
    b[5] = a[5];
    b[6] = a[6];
    b[7] = a[7];
    b[8] = a[8];
    b[9] = a[9];
    b[10] = a[10];
    b[11] = a[11];
    b[12] = 0;
    b[13] = 0;
    b[14] = 0;
    b[15] = 1;
    return b
};

var mat4_toMat3 = function(a, b) {
    b || (b = mat3_create());
    b[0] = a[0];
    b[1] = a[1];
    b[2] = a[2];
    b[3] = a[4];
    b[4] = a[5];
    b[5] = a[6];
    b[6] = a[8];
    b[7] = a[9];
    b[8] = a[10];
    return b
};
var mat4_toInverseMat3 = function(a, b) {
    var c = a[0],
        d = a[1],
        e = a[2],
        g = a[4],
        f = a[5],
        h = a[6],
        i = a[8],
        j = a[9],
        k = a[10],
        l = k * f - h * j,
        o = -k * g + h * i,
        m = j * g - f * i,
        n = c * l + d * o + e * m;
    if (!n) return null;
    n = 1 / n;
    b || (b = mat3_create());
    b[0] = l * n;
    b[1] = (-k * d + e * j) * n;
    b[2] = (h * d - e * f) * n;
    b[3] = o * n;
    b[4] = (k * c - e * i) * n;
    b[5] = (-h * c + e * g) * n;
    b[6] = m * n;
    b[7] = (-j * c + d * i) * n;
    b[8] = (f * c - d * g) * n;
    return b
};
var mat4_multiply = function(a, b, c) {
    c || (c = a);
    var d = a[0],
        e = a[1],
        g = a[2],
        f = a[3],
        h = a[4],
        i = a[5],
        j = a[6],
        k = a[7],
        l = a[8],
        o = a[9],
        m = a[10],
        n = a[11],
        p = a[12],
        r = a[13],
        s = a[14];
    a = a[15];
    var A = b[0],
        B = b[1],
        t = b[2],
        u = b[3],
        v = b[4],
        w = b[5],
        x = b[6],
        y = b[7],
        z = b[8],
        C = b[9],
        D = b[10],
        E = b[11],
        q = b[12],
        F = b[13],
        G = b[14];
    b = b[15];
    c[0] = A * d + B * h + t * l + u * p;
    c[1] = A * e + B * i + t * o + u * r;
    c[2] = A * g + B * j + t * m + u * s;
    c[3] = A * f + B * k + t * n + u * a;
    c[4] = v * d + w * h + x * l + y * p;
    c[5] = v * e + w * i + x * o + y * r;
    c[6] = v * g + w * j + x * m + y * s;
    c[7] = v * f + w * k + x * n + y * a;
    c[8] = z * d + C * h + D * l + E * p;
    c[9] = z * e + C * i + D * o + E * r;
    c[10] = z *
        g + C * j + D * m + E * s;
    c[11] = z * f + C * k + D * n + E * a;
    c[12] = q * d + F * h + G * l + b * p;
    c[13] = q * e + F * i + G * o + b * r;
    c[14] = q * g + F * j + G * m + b * s;
    c[15] = q * f + F * k + G * n + b * a;
    return c
};
var mat4_multiplyVec3 = function(a, b, c) {
    c || (c = b);
    var d = b[0],
        e = b[1];
    b = b[2];
    c[0] = a[0] * d + a[4] * e + a[8] * b + a[12];
    c[1] = a[1] * d + a[5] * e + a[9] * b + a[13];
    c[2] = a[2] * d + a[6] * e + a[10] * b + a[14];
    return c
};
var mat4_multiplyVec4 = function(a, b, c) {
    c || (c = b);
    var d = b[0],
        e = b[1],
        g = b[2];
    b = b[3];
    c[0] = a[0] * d + a[4] * e + a[8] * g + a[12] * b;
    c[1] = a[1] * d + a[5] * e + a[9] * g + a[13] * b;
    c[2] = a[2] * d + a[6] * e + a[10] * g + a[14] * b;
    c[3] = a[3] * d + a[7] * e + a[11] * g + a[15] * b;
    return c
};
var mat4_translate = function(a, b, c) {
    var d = b[0],
        e = b[1];
    b = b[2];
    if (!c || a == c) {
        a[12] = a[0] * d + a[4] * e + a[8] * b + a[12];
        a[13] = a[1] * d + a[5] * e + a[9] * b + a[13];
        a[14] = a[2] * d + a[6] * e + a[10] * b + a[14];
        a[15] = a[3] * d + a[7] * e + a[11] * b + a[15];
        return a
    }
    var g = a[0],
        f = a[1],
        h = a[2],
        i = a[3],
        j = a[4],
        k = a[5],
        l = a[6],
        o = a[7],
        m = a[8],
        n = a[9],
        p = a[10],
        r = a[11];
    c[0] = g;
    c[1] = f;
    c[2] = h;
    c[3] = i;
    c[4] = j;
    c[5] = k;
    c[6] = l;
    c[7] = o;
    c[8] = m;
    c[9] = n;
    c[10] = p;
    c[11] = r;
    c[12] = g * d + j * e + m * b + a[12];
    c[13] = f * d + k * e + n * b + a[13];
    c[14] = h * d + l * e + p * b + a[14];
    c[15] = i * d + o * e + r * b + a[15];
    return c
};
var mat4_scale = function(a, b, c) {
    var d = b[0],
        e = b[1];
    b = b[2];
    if (!c || a == c) {
        a[0] *= d;
        a[1] *= d;
        a[2] *= d;
        a[3] *= d;
        a[4] *= e;
        a[5] *= e;
        a[6] *= e;
        a[7] *= e;
        a[8] *= b;
        a[9] *= b;
        a[10] *= b;
        a[11] *= b;
        return a
    }
    c[0] = a[0] * d;
    c[1] = a[1] * d;
    c[2] = a[2] * d;
    c[3] = a[3] * d;
    c[4] = a[4] * e;
    c[5] = a[5] * e;
    c[6] = a[6] * e;
    c[7] = a[7] * e;
    c[8] = a[8] * b;
    c[9] = a[9] * b;
    c[10] = a[10] * b;
    c[11] = a[11] * b;
    c[12] = a[12];
    c[13] = a[13];
    c[14] = a[14];
    c[15] = a[15];
    return c
};
var mat4_rotate = function(a, b, c, d) {
    var e = c[0],
        g = c[1];
    c = c[2];
    var f = Math.sqrt(e * e + g * g + c * c);
    if (!f) return null;
    if (f != 1) {
        f = 1 / f;
        e *= f;
        g *= f;
        c *= f
    }
    var h = Math.sin(b),
        i = Math.cos(b),
        j = 1 - i;
    b = a[0];
    f = a[1];
    var k = a[2],
        l = a[3],
        o = a[4],
        m = a[5],
        n = a[6],
        p = a[7],
        r = a[8],
        s = a[9],
        A = a[10],
        B = a[11],
        t = e * e * j + i,
        u = g * e * j + c * h,
        v = c * e * j - g * h,
        w = e * g * j - c * h,
        x = g * g * j + i,
        y = c * g * j + e * h,
        z = e * c * j + g * h;
    e = g * c * j - e * h;
    g = c * c * j + i;
    if (d) {
        if (a != d) {
            d[12] = a[12];
            d[13] = a[13];
            d[14] = a[14];
            d[15] = a[15]
        }
    } else d = a;
    d[0] = b * t + o * u + r * v;
    d[1] = f * t + m * u + s * v;
    d[2] = k * t + n * u + A * v;
    d[3] = l * t + p * u + B *
        v;
    d[4] = b * w + o * x + r * y;
    d[5] = f * w + m * x + s * y;
    d[6] = k * w + n * x + A * y;
    d[7] = l * w + p * x + B * y;
    d[8] = b * z + o * e + r * g;
    d[9] = f * z + m * e + s * g;
    d[10] = k * z + n * e + A * g;
    d[11] = l * z + p * e + B * g;
    return d
};
var mat4_rotateX = function(a, b, c) {
    var d = Math.sin(b);
    b = Math.cos(b);
    var e = a[4],
        g = a[5],
        f = a[6],
        h = a[7],
        i = a[8],
        j = a[9],
        k = a[10],
        l = a[11];
    if (c) {
        if (a != c) {
            c[0] = a[0];
            c[1] = a[1];
            c[2] = a[2];
            c[3] = a[3];
            c[12] = a[12];
            c[13] = a[13];
            c[14] = a[14];
            c[15] = a[15]
        }
    } else c = a;
    c[4] = e * b + i * d;
    c[5] = g * b + j * d;
    c[6] = f * b + k * d;
    c[7] = h * b + l * d;
    c[8] = e * -d + i * b;
    c[9] = g * -d + j * b;
    c[10] = f * -d + k * b;
    c[11] = h * -d + l * b;
    return c
};

var mat4_rotateY = function(a, b, c) {
    var d = Math.sin(b);
    b = Math.cos(b);
    var e = a[0],
        g = a[1],
        f = a[2],
        h = a[3],
        i = a[8],
        j = a[9],
        k = a[10],
        l = a[11];
    if (c) {
        if (a != c) {
            c[4] = a[4];
            c[5] = a[5];
            c[6] = a[6];
            c[7] = a[7];
            c[12] = a[12];
            c[13] = a[13];
            c[14] = a[14];
            c[15] = a[15]
        }
    } else c = a;
    c[0] = e * b + i * -d;
    c[1] = g * b + j * -d;
    c[2] = f * b + k * -d;
    c[3] = h * b + l * -d;
    c[8] = e * d + i * b;
    c[9] = g * d + j * b;
    c[10] = f * d + k * b;
    c[11] = h * d + l * b;
    return c
};
var mat4_rotateZ = function(a, b, c) {
    var d = Math.sin(b);
    b = Math.cos(b);
    var e = a[0],
        g = a[1],
        f = a[2],
        h = a[3],
        i = a[4],
        j = a[5],
        k = a[6],
        l = a[7];
    if (c) {
        if (a != c) {
            c[8] = a[8];
            c[9] = a[9];
            c[10] = a[10];
            c[11] = a[11];
            c[12] = a[12];
            c[13] = a[13];
            c[14] = a[14];
            c[15] = a[15]
        }
    } else c = a;
    c[0] = e * b + i * d;
    c[1] = g * b + j * d;
    c[2] = f * b + k * d;
    c[3] = h * b + l * d;
    c[4] = e * -d + i * b;
    c[5] = g * -d + j * b;
    c[6] = f * -d + k * b;
    c[7] = h * -d + l * b;
    return c
};
var mat4_frustum = function(Left, Right, Bottom, Top, Near, Far, Out) {
    if (!Out) {
        Out = mat4_create();
    }
    
    var Width = Right - Left;
    var Height = Top - Bottom;
    var Depth = Far - Near;
        
    Out[0] = Near * 2 / Width;
    Out[1] = 0;
    Out[2] = 0;
    Out[3] = 0;
    Out[4] = 0;
    Out[5] = Near * 2 / Height;
    Out[6] = 0;
    Out[7] = 0;
    Out[8] = (Right + Left) / Width;
    Out[9] = (Top + Bottom) / Height;
    Out[10] = -(Far + Near) / Depth;
    Out[11] = -1;
    Out[12] = 0;
    Out[13] = 0;
    Out[14] = -(Far * Near * 2) / Depth;
    Out[15] = 0;
    return Out
};
var mat4_perspective = function(a, b, c, d, e) {
    a = c * Math.tan(a * Math.PI / 360);
    b = a * b;
    return mat4_frustum(-b, b, -a, a, c, d, e)
};
var mat4_ortho = function(a, b, c, d, e, g, f) {
    f || (f = mat4_create());
    var h = b - a,
        i = d - c,
        j = g - e;
    f[0] = 2 / h;
    f[1] = 0;
    f[2] = 0;
    f[3] = 0;
    f[4] = 0;
    f[5] = 2 / i;
    f[6] = 0;
    f[7] = 0;
    f[8] = 0;
    f[9] = 0;
    f[10] = -2 / j;
    f[11] = 0;
    f[12] = -(a + b) / h;
    f[13] = -(d + c) / i;
    f[14] = -(g + e) / j;
    f[15] = 1;
    return f
};
var mat4_lookAt = function(a, b, c, d) {
    d || (d = mat4_create());
    var e = a[0],
        g = a[1];
    a = a[2];
    var f = c[0],
        h = c[1],
        i = c[2];
    c = b[1];
    var j = b[2];
    if (e == b[0] && g == c && a == j) return mat4_identity(d);
    var k, l, o, m;
    c = e - b[0];
    j = g - b[1];
    b = a - b[2];
    m = 1 / Math.sqrt(c * c + j * j + b * b);
    c *= m;
    j *= m;
    b *= m;
    k = h * b - i * j;
    i = i * c - f * b;
    f = f * j - h * c;
    if (m = Math.sqrt(k * k + i * i + f * f)) {
        m = 1 / m;
        k *= m;
        i *= m;
        f *= m
    } else f = i = k = 0;
    h = j * f - b * i;
    l = b * k - c * f;
    o = c * i - j * k;
    if (m = Math.sqrt(h * h + l * l + o * o)) {
        m = 1 / m;
        h *= m;
        l *= m;
        o *= m
    } else o = l = h = 0;
    d[0] = k;
    d[1] = h;
    d[2] = c;
    d[3] = 0;
    d[4] = i;
    d[5] = l;
    d[6] = j;
    d[7] = 0;
    d[8] = f;
    d[9] =
        o;
    d[10] = b;
    d[11] = 0;
    d[12] = -(k * e + i * g + f * a);
    d[13] = -(h * e + l * g + o * a);
    d[14] = -(c * e + j * g + b * a);
    d[15] = 1;
    return d
};
var mat4_str = function(a) {
    return "[" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + "]"
};

/* cached source */
var mat4__decodeSrc = `function() {
    return #*arguments[0] 
        + #*arguments[1] 
        + #*arguments[2] 
        + #*arguments[3]
        ;        
}`.trim();

/* decodes a 1x4 vector to linear function */
var mat4_decode = function(V) {    
    // precompile it.
    var src = mat4__decodeSrc
        .replace('#', V[0])
        .replace('#', V[1])
        .replace('#', V[2])
        .replace('#', V[3]);

    return eval("(" + src + ")");
};

var mat4_row = function(self, rowNumber) {
    var start = rowNumber * 4;
    
    return self.slice(start, start + 4);
};

var mat4_column = function(self, columnNumber) {
    var rowlength = self.length / 4;

    var x = self[columnNumber];
    var y = self[rowlength + columnNumber];
    var z = self[2 * rowlength + columnNumber];
    var w = self[3 * rowlength + columnNumber];
    return new Float32Array([x, y, z, w]);
};

/*
applies this 4x4 matrix on a 4xN matrix of arbitrary N.
creating a new 4xN matrix.
this is useful for mass multiplying many points at once.
*/
var mat4_apply = function(self, pointMatrix) {
    console.log('in apply');
    console.log(pointMatrix.length);
    window.d0 = pointMatrix;
    var N = pointMatrix.length / 4;
    var result = new Float32Array(4 * N);
        
    if (N == 1) {
        var x = pointMatrix[0];
        var y = pointMatrix[1];
        var z = pointMatrix[2];
        var w = pointMatrix[3];
    
        result[0] = x*self[0] + y*self[1] + z*self[2] + w*self[3];
        result[1] = x*self[4] + y*self[5] + z*self[6] + w*self[7];
        result[2] = x*self[8] + y*self[9] + z*self[10] + w*self[11];
        result[3] = x*self[12] + y*self[13] + z*self[14] + w*self[15];
    } else {
        for (var i = 0; i < 4; ++i) {
            var f = mat4_decode(mat4_row(self, i));
            
            console.log(f);
            
            for (var j = 0; j < N; ++j) {
                var u = mat4_column(pointMatrix, j);
                
                result[i * N + j] = f.apply(null, u);
            }
        }
    }
    
    return result;
};

var quat4_create = function(a) {
    var b = new Float32Array(4);
    if (a) {
        b[0] = a[0];
        b[1] = a[1];
        b[2] = a[2];
        b[3] = a[3]
    }
    return b
};
var quat4_set = function(a, b) {
    b[0] = a[0];
    b[1] = a[1];
    b[2] = a[2];
    b[3] = a[3];
    return b
};
var quat4_calculateW = function(a, b) {
    var c = a[0],
        d = a[1],
        e = a[2];
    if (!b || a == b) {
        a[3] = -Math.sqrt(Math.abs(1 - c * c - d * d - e * e));
        return a
    }
    b[0] = c;
    b[1] = d;
    b[2] = e;
    b[3] = -Math.sqrt(Math.abs(1 - c * c - d * d - e * e));
    return b
};
var quat4_inverse = function(a, b) {
    if (!b || a == b) {
        a[0] *= 1;
        a[1] *= 1;
        a[2] *= 1;
        return a
    }
    b[0] = -a[0];
    b[1] = -a[1];
    b[2] = -a[2];
    b[3] = a[3];
    return b
};
var quat4_length = function(a) {
    var b = a[0],
        c = a[1],
        d = a[2];
    a = a[3];
    return Math.sqrt(b * b + c * c + d * d + a * a)
};
var quat4_normalize = function(a, b) {
    b || (b = a);
    var c = a[0],
        d = a[1],
        e = a[2],
        g = a[3],
        f = Math.sqrt(c * c + d * d + e * e + g * g);
    if (f == 0) {
        b[0] = 0;
        b[1] = 0;
        b[2] = 0;
        b[3] = 0;
        return b
    }
    f = 1 / f;
    b[0] = c * f;
    b[1] = d * f;
    b[2] = e * f;
    b[3] = g * f;
    return b
};
var quat4_multiply = function(a, b, c) {
    c || (c = a);
    var d = a[0],
        e = a[1],
        g = a[2];
    a = a[3];
    var f = b[0],
        h = b[1],
        i = b[2];
    b = b[3];
    c[0] = d * b + a * f + e * i - g * h;
    c[1] = e * b + a * h + g * f - d * i;
    c[2] = g * b + a * i + d * h - e * f;
    c[3] = a * b - d * f - e * h - g * i;
    return c
};
var quat4_multiplyVec3 = function(a, b, c) {
    c || (c = b);
    var d = b[0],
        e = b[1],
        g = b[2];
    b = a[0];
    var f = a[1],
        h = a[2];
    a = a[3];
    var i = a * d + f * g - h * e,
        j = a * e + h * d - b * g,
        k = a * g + b * e - f * d;
    d = -b * d - f * e - h * g;
    c[0] = i * a + d * -b + j * -h - k * -f;
    c[1] = j * a + d * -f + k * -b - i * -h;
    c[2] = k * a + d * -h + i * -f - j * -b;
    return c
};
var quat4_toMat3 = function(a, b) {
    b || (b = mat3_create());
    var c = a[0],
        d = a[1],
        e = a[2],
        g = a[3],
        f = c + c,
        h = d + d,
        i = e + e,
        j = c * f,
        k = c * h;
    c = c * i;
    var l = d * h;
    d = d * i;
    e = e * i;
    f = g * f;
    h = g * h;
    g = g * i;
    b[0] = 1 - (l + e);
    b[1] = k - g;
    b[2] = c + h;
    b[3] = k + g;
    b[4] = 1 - (j + e);
    b[5] = d - f;
    b[6] = c - h;
    b[7] = d + f;
    b[8] = 1 - (j + l);
    return b
};
var quat4_toMat4 = function(a, b) {
    b || (b = mat4_create());
    var c = a[0],
        d = a[1],
        e = a[2],
        g = a[3],
        f = c + c,
        h = d + d,
        i = e + e,
        j = c * f,
        k = c * h;
    c = c * i;
    var l = d * h;
    d = d * i;
    e = e * i;
    f = g * f;
    h = g * h;
    g = g * i;
    b[0] = 1 - (l + e);
    b[1] = k - g;
    b[2] = c + h;
    b[3] = 0;
    b[4] = k + g;
    b[5] = 1 - (j + e);
    b[6] = d - f;
    b[7] = 0;
    b[8] = c - h;
    b[9] = d + f;
    b[10] = 1 - (j + l);
    b[11] = 0;
    b[12] = 0;
    b[13] = 0;
    b[14] = 0;
    b[15] = 1;
    return b
};
var quat4_slerp = function(a, b, c, d) {
    d || (d = a);
    var e = c;
    if (a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3] < 0) e = -1 * c;
    d[0] = 1 - c * a[0] + e * b[0];
    d[1] = 1 - c * a[1] + e * b[1];
    d[2] = 1 - c * a[2] + e * b[2];
    d[3] = 1 - c * a[3] + e * b[3];
    return d
};
var quat4_str = function(a) {
    return "[" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + "]"
};
