"use client";
import { nextUtility } from "@/utility";
import { useEffect } from "react";
const Preloader = () => {
  useEffect(() => {
    nextUtility.preloader();
  }, []);
  return (
    <div id="preloader" className="preloader">
      <div className="animation-preloader">
        <div className="spinner"></div>
        <div className="txt-loading">
          <span data-text-preloader="F" className="letters-loading">
            F
          </span>
          <span data-text-preloader="I" className="letters-loading">
            I
          </span>
          <span data-text-preloader="R" className="letters-loading">
            R
          </span>
          <span data-text-preloader="E" className="letters-loading">
            E
          </span>
          <span data-text-preloader="U" className="letters-loading">
            U
          </span>
          <span data-text-preloader="P" className="letters-loading">
            P
          </span>
          <span data-text-preloader="C" className="letters-loading">
            C
          </span>
          <span data-text-preloader="L" className="letters-loading">
            L
          </span>
          <span data-text-preloader="U" className="letters-loading">
            U
          </span>
          <span data-text-preloader="B" className="letters-loading">
            B
          </span>
        </div>
        <p className="text-center">Loading</p>
      </div>
      <div className="loader">
        <div className="row">
          <div className="col-3 loader-section section-left">
            <div className="bg" />
          </div>
          <div className="col-3 loader-section section-left">
            <div className="bg" />
          </div>
          <div className="col-3 loader-section section-right">
            <div className="bg" />
          </div>
          <div className="col-3 loader-section section-right">
            <div className="bg" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Preloader;
