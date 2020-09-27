# SATySFi cross ref extension #

An extension of cross references in
[SATySFi](https://github.com/gfngfn/SATySFi).

## Usage ##

The `CrossRefExt` module in the `cross-ref-ext/cross-ref-ext` package
provides the following functions.

```satysfi
val register : ('a CrossRefExt-Type.t) implicit -> string -> 'a -> unit
val get : ('a CrossRefExt-Type.t) implicit -> string -> 'a option
```

The usage is similar to the primitives `register-cross-reference` and
`get-cross-reference`, but this package allows to register a value of
a type other than `string`. One can register a value of any type that
can be represented as an S-expression. See `cross-ref-ext/type` for
how to define a cross reference type.
