/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Block template structure
 */
const TEMPLATE = [
  // Main heading
  ['core/heading', {
    level: 2,
    content: 'Maintenance Service Statistics',
    className: 'multi-column-content__main-heading',
    textAlign: 'center',
    style: {
      typography: {
        fontSize: 'var(--wp--preset--font-size--3-xl)',
        fontWeight: '700',
        lineHeight: '1.2'
      },
      spacing: {
        margin: {
          bottom: '2rem'
        }
      }
    },
    textColor: 'main',
    fontFamily: 'montserrat'
  }],

  // Statistics columns (2 columns with white card backgrounds)
  ['core/columns', {
    className: 'multi-column-content__statistics',
    style: {
      spacing: {
        blockGap: '1.875rem',
        margin: {
          bottom: '3rem'
        }
      }
    }
  }, [
    // Column 1 - White card
    ['core/column', {
      backgroundColor: 'base',
      style: {
        border: {
          radius: '0.5rem',
          width: '1px',
          color: 'var(--wp--preset--color--border-light)'
        },
        spacing: {
          padding: {
            top: '2.8125rem',
            right: '2.5rem',
            bottom: '2.8125rem',
            left: '2.5rem'
          }
        }
      }
    }, [
      ['core/paragraph', {
        content: 'Trusted by SMEs across US and Europe',
        className: 'multi-column-content__tagline',
        align: 'center',
        style: {
          typography: {
            fontSize: 'var(--wp--preset--font-size--base)',
            lineHeight: '1.6'
          },
          spacing: {
            margin: {
              bottom: '1.5rem'
            }
          }
        },
        textColor: 'secondary',
        fontFamily: 'open-sans'
      }],
      ['core/heading', {
        level: 3,
        content: '0 Major Security Breaches',
        textAlign: 'center',
        style: {
          typography: {
            fontSize: 'var(--wp--preset--font-size--3-xl)',
            fontWeight: '700',
            lineHeight: '1.2'
          },
          spacing: {
            margin: {
              bottom: '1rem'
            }
          }
        },
        textColor: 'main',
        fontFamily: 'montserrat'
      }],
      ['core/paragraph', {
        content: 'In 15+ years of service',
        className: 'multi-column-content__subtext',
        align: 'center',
        style: {
          typography: {
            fontSize: 'var(--wp--preset--font-size--base)',
            lineHeight: '1.6'
          }
        },
        textColor: 'secondary',
        fontFamily: 'open-sans'
      }]
    ]],
    // Column 2 - White card
    ['core/column', {
      backgroundColor: 'base',
      style: {
        border: {
          radius: '0.5rem',
          width: '1px',
          color: 'var(--wp--preset--color--border-light)'
        },
        spacing: {
          padding: {
            top: '2.8125rem',
            right: '2.5rem',
            bottom: '2.8125rem',
            left: '2.5rem'
          }
        }
      }
    }, [
      ['core/paragraph', {
        content: 'Exceeding industry standards',
        className: 'multi-column-content__tagline',
        align: 'center',
        style: {
          typography: {
            fontSize: 'var(--wp--preset--font-size--base)',
            lineHeight: '1.6'
          },
          spacing: {
            margin: {
              bottom: '1.5rem'
            }
          }
        },
        textColor: 'secondary',
        fontFamily: 'open-sans'
      }],
      ['core/heading', {
        level: 3,
        content: '2-Hour Average Response',
        textAlign: 'center',
        style: {
          typography: {
            fontSize: 'var(--wp--preset--font-size--3-xl)',
            fontWeight: '700',
            lineHeight: '1.2'
          },
          spacing: {
            margin: {
              bottom: '1rem'
            }
          }
        },
        textColor: 'main',
        fontFamily: 'montserrat'
      }],
      ['core/paragraph', {
        content: 'For priority maintenance issues',
        className: 'multi-column-content__subtext',
        align: 'center',
        style: {
          typography: {
            fontSize: 'var(--wp--preset--font-size--base)',
            lineHeight: '1.6'
          }
        },
        textColor: 'secondary',
        fontFamily: 'open-sans'
      }]
    ]]
  ]],

  // Center heading
  ['core/heading', {
    level: 2,
    content: 'Ready to Stop Worrying About Website Maintenance?',
    className: 'multi-column-content__center-heading',
    textAlign: 'center',
    style: {
      typography: {
        fontSize: 'var(--wp--preset--font-size--2-xl)',
        fontWeight: '600',
        lineHeight: '1.3'
      },
      spacing: {
        margin: {
          top: '1rem',
          bottom: '1.5rem'
        }
      }
    },
    textColor: 'main',
    fontFamily: 'montserrat'
  }],

  // Subheading paragraph
  ['core/paragraph', {
    content: 'Join 200+ SMEs who trust Imagewize with their WordPress maintenance. Get started with a free site audit.',
    className: 'multi-column-content__subheading',
    align: 'center',
    style: {
      typography: {
        fontSize: 'var(--wp--preset--font-size--lg)',
        lineHeight: '1.7'
      },
      spacing: {
        margin: {
          bottom: '2rem'
        }
      }
    },
    textColor: 'secondary',
    fontFamily: 'open-sans'
  }],

  // CTA columns (2 columns with white card backgrounds)
  ['core/columns', {
    className: 'multi-column-content__cta-columns',
    style: {
      spacing: {
        blockGap: '1.875rem',
        margin: {
          bottom: '2rem'
        }
      }
    }
  }, [
    // Column 1 - White card
    ['core/column', {
      backgroundColor: 'base',
      style: {
        border: {
          radius: '0.5rem',
          width: '1px',
          color: 'var(--wp--preset--color--border-light)'
        },
        spacing: {
          padding: {
            top: '2.8125rem',
            right: '2.5rem',
            bottom: '2.8125rem',
            left: '2.5rem'
          }
        }
      }
    }, [
      ['core/heading', {
        level: 3,
        content: 'Start Your Maintenance Plan',
        textAlign: 'center',
        style: {
          typography: {
            fontSize: 'var(--wp--preset--font-size--xl)',
            fontWeight: '600',
            lineHeight: '1.4'
          },
          spacing: {
            margin: {
              bottom: '1rem'
            }
          }
        },
        textColor: 'main',
        fontFamily: 'montserrat'
      }],
      ['core/paragraph', {
        content: 'Choose the plan that fits your business needs',
        align: 'center',
        style: {
          typography: {
            fontSize: 'var(--wp--preset--font-size--base)',
            lineHeight: '1.7'
          },
          spacing: {
            margin: {
              bottom: '2rem'
            }
          }
        },
        textColor: 'secondary',
        fontFamily: 'open-sans'
      }],
      ['core/buttons', {
        className: 'multi-column-content__buttons',
        layout: {
          type: 'flex',
          justifyContent: 'center'
        }
      }, [
        ['core/button', {
          text: 'Get Free Site Audit',
          url: '#',
          backgroundColor: 'primary',
          textColor: 'base',
          className: 'is-style-fill',
          style: {
            border: {
              radius: '0.5rem'
            }
          }
        }]
      ]]
    ]],
    // Column 2 - White card
    ['core/column', {
      backgroundColor: 'base',
      style: {
        border: {
          radius: '0.5rem',
          width: '1px',
          color: 'var(--wp--preset--color--border-light)'
        },
        spacing: {
          padding: {
            top: '2.8125rem',
            right: '2.5rem',
            bottom: '2.8125rem',
            left: '2.5rem'
          }
        }
      }
    }, [
      ['core/heading', {
        level: 3,
        content: 'Need a Custom Solution?',
        textAlign: 'center',
        style: {
          typography: {
            fontSize: 'var(--wp--preset--font-size--xl)',
            fontWeight: '600',
            lineHeight: '1.4'
          },
          spacing: {
            margin: {
              bottom: '1rem'
            }
          }
        },
        textColor: 'main',
        fontFamily: 'montserrat'
      }],
      ['core/paragraph', {
        content: 'Discuss your specific maintenance requirements',
        align: 'center',
        style: {
          typography: {
            fontSize: 'var(--wp--preset--font-size--base)',
            lineHeight: '1.7'
          },
          spacing: {
            margin: {
              bottom: '2rem'
            }
          }
        },
        textColor: 'secondary',
        fontFamily: 'open-sans'
      }],
      ['core/buttons', {
        className: 'multi-column-content__buttons',
        layout: {
          type: 'flex',
          justifyContent: 'center'
        }
      }, [
        ['core/button', {
          text: 'Talk to Our Team',
          url: '#',
          backgroundColor: 'primary',
          textColor: 'base',
          className: 'is-style-fill',
          style: {
            border: {
              radius: '0.5rem'
            }
          }
        }]
      ]]
    ]]
  ]],

  // Benefits columns (3 columns)
  ['core/columns', {
    className: 'multi-column-content__benefits',
    style: {
      spacing: {
        blockGap: '1.875rem'
      }
    }
  }, [
    ['core/column', {}, [
      ['core/paragraph', {
        content: '99.9% uptime guarantee',
        className: 'multi-column-content__benefit',
        align: 'center',
        style: {
          typography: {
            fontSize: 'var(--wp--preset--font-size--base)',
            lineHeight: '1.6'
          }
        },
        textColor: 'secondary',
        fontFamily: 'open-sans'
      }]
    ]],
    ['core/column', {}, [
      ['core/paragraph', {
        content: 'No setup fees',
        className: 'multi-column-content__benefit',
        align: 'center',
        style: {
          typography: {
            fontSize: 'var(--wp--preset--font-size--base)',
            lineHeight: '1.6'
          }
        },
        textColor: 'secondary',
        fontFamily: 'open-sans'
      }]
    ]],
    ['core/column', {}, [
      ['core/paragraph', {
        content: 'Cancel anytime',
        className: 'multi-column-content__benefit',
        align: 'center',
        style: {
          typography: {
            fontSize: 'var(--wp--preset--font-size--base)',
            lineHeight: '1.6'
          }
        },
        textColor: 'secondary',
        fontFamily: 'open-sans'
      }]
    ]]
  ]]
];

/**
 * Edit function that renders in the admin
 */
export default function Edit() {
  const blockProps = useBlockProps({
    className: 'multi-column-content'
  });

  return (
    <div {...blockProps}>
      <InnerBlocks
        template={TEMPLATE}
        templateLock={false}
      />
    </div>
  );
}
