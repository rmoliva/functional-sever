// https://gist.github.com/dypsilon/6b242998ba3474fc239255d42b28dd02
class Continuation {
  constructor(x) {
    this.x = x;
  }
}

Continuation.prototype.of = Continuation.of = x => {
  return new Continuation((resolve) => resolve(x));
}

Continuation.prototype.chain = function(f) {
  const x = this.x;
  return new Continuation((resolve) => {
    x((res) => f(res).x(res2 => resolve(res2)));
  });
};

Continuation.prototype.run = function(f) {
  return this.x(f);
};

Continuation.prototype.inspect = function() {
  return `Continuation(${this.x})`;
}

// derivations
Continuation.prototype.map = function(f) {
  var m = this;
  return m.chain(a => m.of(f(a)));
}

Continuation.prototype.ap = function(m) {
  return this.chain(f => m.map(f));
}

module.exports = Continuation;