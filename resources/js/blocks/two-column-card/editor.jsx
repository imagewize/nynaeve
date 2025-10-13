import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [
  'core/heading',
  'core/columns'
];

const TEMPLATE = [
  ['core/heading', {
    level: 3,
    content: 'Why SMEs Need Professional WordPress Maintenance',
    fontFamily: 'montserrat',
    fontSize: '3xl',
    style: {
      typography: {
        fontWeight: '700',
        lineHeight: '1.2'
      },
      spacing: {
        margin: {
          bottom: '3rem'
        }
      }
    },
    textColor: 'contrast',
    className: 'two-column-card__main-heading',
    textAlign: 'center'
  }],
  ['core/columns', {
    className: 'two-column-card__columns'
  }, [
    ['core/column', {}, [
      ['core/group', {
        className: 'two-column-card__card',
        style: {
          spacing: {
            margin: {
              bottom: '1.875rem'
            }
          }
        }
      }, [
        ['core/heading', {
          level: 4,
          content: 'Security Threats',
          fontFamily: 'montserrat',
          fontSize: 'xl',
          style: {
            typography: {
              fontWeight: '600',
              lineHeight: '1.4'
            },
            spacing: {
              margin: {
                bottom: '1.125rem'
              },
              padding: {
                bottom: '0.9375rem'
              }
            }
          },
          textColor: 'contrast',
          className: 'two-column-card__heading'
        }],
        ['core/paragraph', {
          content: 'WordPress powers 40% of websites, making it a prime target for hackers. Without regular security updates, your business is at risk.',
          fontFamily: 'open-sans',
          fontSize: 'base',
          style: {
            typography: {
              fontWeight: '400',
              lineHeight: '1.8'
            }
          },
          textColor: 'base-accent'
        }]
      ]],
      ['core/group', { className: 'two-column-card__card' }, [
        ['core/heading', {
          level: 4,
          content: 'Technical Complexity',
          fontFamily: 'montserrat',
          fontSize: 'xl',
          style: {
            typography: {
              fontWeight: '600',
              lineHeight: '1.4'
            },
            spacing: {
              margin: {
                bottom: '1.125rem'
              },
              padding: {
                bottom: '0.9375rem'
              }
            }
          },
          textColor: 'contrast',
          className: 'two-column-card__heading'
        }],
        ['core/paragraph', {
          content: 'Managing WordPress updates, backups, and performance requires technical expertise most SMEs don\'t have in-house.',
          fontFamily: 'open-sans',
          fontSize: 'base',
          style: {
            typography: {
              fontWeight: '400',
              lineHeight: '1.8'
            }
          },
          textColor: 'base-accent'
        }]
      ]]
    ]],
    ['core/column', {}, [
      ['core/group', {
        className: 'two-column-card__card',
        style: {
          spacing: {
            margin: {
              bottom: '1.875rem'
            }
          }
        }
      }, [
        ['core/heading', {
          level: 4,
          content: 'Time Investment',
          fontFamily: 'montserrat',
          fontSize: 'xl',
          style: {
            typography: {
              fontWeight: '600',
              lineHeight: '1.4'
            },
            spacing: {
              margin: {
                bottom: '1.125rem'
              },
              padding: {
                bottom: '0.9375rem'
              }
            }
          },
          textColor: 'contrast',
          className: 'two-column-card__heading'
        }],
        ['core/paragraph', {
          content: 'Proper website maintenance takes 2-4 hours monthly at least – time that could be better spent growing your business and serving your customers.',
          fontFamily: 'open-sans',
          fontSize: 'base',
          style: {
            typography: {
              fontWeight: '400',
              lineHeight: '1.8'
            }
          },
          textColor: 'base-accent'
        }]
      ]],
      ['core/group', { className: 'two-column-card__card' }, [
        ['core/heading', {
          level: 4,
          content: 'Costly Downtime',
          fontFamily: 'montserrat',
          fontSize: 'xl',
          style: {
            typography: {
              fontWeight: '600',
              lineHeight: '1.4'
            },
            spacing: {
              margin: {
                bottom: '1.125rem'
              },
              padding: {
                bottom: '0.9375rem'
              }
            }
          },
          textColor: 'contrast',
          className: 'two-column-card__heading'
        }],
        ['core/paragraph', {
          content: 'Website issues can cost SMEs hundreds or thousands in lost revenue. Prevention is always cheaper than emergency fixes.',
          fontFamily: 'open-sans',
          fontSize: 'base',
          style: {
            typography: {
              fontWeight: '400',
              lineHeight: '1.8'
            }
          },
          textColor: 'base-accent'
        }]
      ]]
    ]]
  ]]
];

export default function Edit() {
  const blockProps = useBlockProps({
    className: 'two-column-card'
  });

  return (
    <div {...blockProps}>
      <InnerBlocks
        allowedBlocks={ALLOWED_BLOCKS}
        template={TEMPLATE}
        templateLock={false}
      />
    </div>
  );
}
