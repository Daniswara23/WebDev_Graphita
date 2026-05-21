"use client";

import { useEffect, useRef } from 'react';

export default function ScrollAnimations() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const mutationObserverRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.05,
      rootMargin: '0px 0px -50px 0px'
    };

    // Create intersection observer
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
        }
      });
    }, observerOptions);

    // Function to observe all animate-on-scroll elements
    const observeAnimateElements = () => {
      const animatedElements = document.querySelectorAll('.animate-on-scroll:not(.animate-visible)');
      animatedElements.forEach((el) => {
        if (observerRef.current) {
          observerRef.current.observe(el);
        }
      });
    };

    // Function to handle grid items stagger animation
    const animateGridItems = () => {
      const gridItems = document.querySelectorAll('.grid-item:not(.animate-visible)');
      gridItems.forEach((item, index) => {
        setTimeout(() => {
          if (!item.classList.contains('animate-visible')) {
            item.classList.add('animate-visible');
          }
        }, index * 100);
      });
    };

    // Initial observation and animation
    observeAnimateElements();
    animateGridItems();

    // Setup mutation observer to watch for new elements added to DOM
    mutationObserverRef.current = new MutationObserver(() => {
      // Re-observe any new animate-on-scroll elements
      setTimeout(() => {
        observeAnimateElements();
        animateGridItems();
      }, 100);
    });

    // Watch for changes in the document
    mutationObserverRef.current.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (mutationObserverRef.current) {
        mutationObserverRef.current.disconnect();
      }
    };
  }, []);

  return null;
}