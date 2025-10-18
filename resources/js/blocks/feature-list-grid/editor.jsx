/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * InnerBlocks template for feature list grid
 * 2 columns with 5 feature cards (3 in left, 2 in right)
 */
const TEMPLATE = [
  ['core/heading', {
    level: 2,
    content: 'Complete WordPress Maintenance Coverage',
    fontFamily: 'montserrat',
    fontSize: '3xl',
    textAlign: 'center',
    textColor: 'contrast',
    style: {
      typography: {
        fontWeight: '700',
        lineHeight: '1.3'
      },
      spacing: {
        margin: { bottom: '3rem' }
      }
    }
  }],
  ['core/columns', {
    className: 'feature-list-grid__columns'
  }, [
    // Left column - 3 cards
    ['core/column', {}, [
      // Card 1: Security & Protection
      ['core/group', {
        className: 'feature-list-grid__card',
        style: {
          spacing: {
            margin: { bottom: '2rem' },
            padding: { top: '2.5rem', right: '2.5rem', bottom: '2.5rem', left: '2.5rem' }
          },
          border: { radius: '12px' }
        },
        backgroundColor: 'base'
      }, [
        ['core/heading', {
          level: 4,
          content: 'Security & Protection',
          fontFamily: 'montserrat',
          fontSize: 'xl',
          textColor: 'primary',
          style: {
            typography: { fontWeight: '600', lineHeight: '1.4' },
            spacing: { margin: { bottom: '1rem' } }
          }
        }],
        ['core/list', {
          className: 'feature-list-grid__list',
          values: '<li>Real-time malware scanning</li><li>Security plugin management</li><li>Firewall configuration</li><li>Brute force protection</li><li>SSL certificate monitoring</li><li>Security audit logging</li>',
          style: {
            typography: { lineHeight: '1.8' },
            spacing: { margin: { top: '1rem' } }
          }
        }]
      ]],
      // Card 2: Updates & Maintenance
      ['core/group', {
        className: 'feature-list-grid__card',
        style: {
          spacing: {
            margin: { bottom: '2rem' },
            padding: { top: '2.5rem', right: '2.5rem', bottom: '2.5rem', left: '2.5rem' }
          },
          border: { radius: '12px' }
        },
        backgroundColor: 'base'
      }, [
        ['core/heading', {
          level: 4,
          content: 'Updates & Maintenance',
          fontFamily: 'montserrat',
          fontSize: 'xl',
          textColor: 'primary',
          style: {
            typography: { fontWeight: '600', lineHeight: '1.4' },
            spacing: { margin: { bottom: '1rem' } }
          }
        }],
        ['core/list', {
          className: 'feature-list-grid__list',
          values: '<li>WordPress core updates</li><li>Plugin updates & testing</li><li>Theme updates</li><li>PHP version management</li><li>Database optimization</li><li>Broken link checking</li>',
          style: {
            typography: { lineHeight: '1.8' },
            spacing: { margin: { top: '1rem' } }
          }
        }]
      ]],
      // Card 3: Backups & Recovery
      ['core/group', {
        className: 'feature-list-grid__card',
        style: {
          spacing: {
            padding: { top: '2.5rem', right: '2.5rem', bottom: '2.5rem', left: '2.5rem' }
          },
          border: { radius: '12px' }
        },
        backgroundColor: 'base'
      }, [
        ['core/heading', {
          level: 4,
          content: 'Backups & Recovery',
          fontFamily: 'montserrat',
          fontSize: 'xl',
          textColor: 'primary',
          style: {
            typography: { fontWeight: '600', lineHeight: '1.4' },
            spacing: { margin: { bottom: '1rem' } }
          }
        }],
        ['core/list', {
          className: 'feature-list-grid__list',
          values: '<li>Daily automated backups</li><li>Offsite storage</li><li>One-click restoration</li><li>Database backups</li><li>File backups</li><li>30-day backup retention</li>',
          style: {
            typography: { lineHeight: '1.8' },
            spacing: { margin: { top: '1rem' } }
          }
        }]
      ]]
    ]],
    // Right column - 2 cards
    ['core/column', {}, [
      // Card 4: Performance & Monitoring
      ['core/group', {
        className: 'feature-list-grid__card',
        style: {
          spacing: {
            margin: { bottom: '2rem' },
            padding: { top: '2.5rem', right: '2.5rem', bottom: '2.5rem', left: '2.5rem' }
          },
          border: { radius: '12px' }
        },
        backgroundColor: 'base'
      }, [
        ['core/heading', {
          level: 4,
          content: 'Performance & Monitoring',
          fontFamily: 'montserrat',
          fontSize: 'xl',
          textColor: 'primary',
          style: {
            typography: { fontWeight: '600', lineHeight: '1.4' },
            spacing: { margin: { bottom: '1rem' } }
          }
        }],
        ['core/list', {
          className: 'feature-list-grid__list',
          values: '<li>24/7 uptime monitoring</li><li>Performance optimization</li><li>Image optimization</li><li>Cache management</li><li>CDN configuration</li><li>Speed testing & reports</li>',
          style: {
            typography: { lineHeight: '1.8' },
            spacing: { margin: { top: '1rem' } }
          }
        }]
      ]],
      // Card 5: Support & Reporting
      ['core/group', {
        className: 'feature-list-grid__card',
        style: {
          spacing: {
            padding: { top: '2.5rem', right: '2.5rem', bottom: '2.5rem', left: '2.5rem' }
          },
          border: { radius: '12px' }
        },
        backgroundColor: 'base'
      }, [
        ['core/heading', {
          level: 4,
          content: 'Support & Reporting',
          fontFamily: 'montserrat',
          fontSize: 'xl',
          textColor: 'primary',
          style: {
            typography: { fontWeight: '600', lineHeight: '1.4' },
            spacing: { margin: { bottom: '1rem' } }
          }
        }],
        ['core/list', {
          className: 'feature-list-grid__list',
          values: '<li>Priority email support</li><li>Monthly maintenance reports</li><li>Emergency response</li><li>Content updates</li><li>Technical consultation</li><li>Dedicated account manager</li>',
          style: {
            typography: { lineHeight: '1.8' },
            spacing: { margin: { top: '1rem' } }
          }
        }]
      ]]
    ]]
  ]]
];

/**
 * Edit function that renders in the admin
 */
export default function Edit() {
  const blockProps = useBlockProps({
    className: 'wp-block-imagewize-feature-list-grid'
  });

  return (
    <div { ...blockProps }>
      <InnerBlocks
        template={TEMPLATE}
        templateLock={false}
      />
    </div>
  );
}
