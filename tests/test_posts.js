var app = require("../server.js");
var supertest = require("supertest");
var assert = require("chai").assert;

describe("test blog posts endpoint", function() {
  //Test présence form /create
  describe("GET /post/create", function() {
    it("should have a form!", function(done) {
      supertest(app)
      .get("/post/create")
      .set("User-Agent", "API testing")
      .expect(function(res) {
        assert(res.text.search("<form>.*</form>"));
      })
      .expect(200)
      .end(done);
    });
  });
  //Test présence form /edit
  describe("GET /post/edit", function() {
    it("should have a form!", function(done) {
      supertest(app)
      .get("/post/edit/"+"5b1d6189d061ae58ae28c9c9")
      .set("User-Agent", "API testing")
      .expect(function(res) {
        assert(res.text.search("<form>.*</form>"));
      })
      .expect(200)
      .end(done);
    });
  });
  //Test form post/:id
  describe("GET /post/:id", function() {
      it("expected 200!", function(done) {
        supertest(app)
        .get("/post/"+"5b1d6189d061ae58ae28c9c9")
        .set("User-Agent", "API testing")
        .expect(function(res) {
          assert(res.text.search("<form>.*</form>"));
        })
        .expect(200)
        .end(done);
      });
    });
})
