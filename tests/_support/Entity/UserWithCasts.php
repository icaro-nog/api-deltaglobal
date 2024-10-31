<?php

declare(strict_types=1);

/**
 * This file is part of CodeIgniter 4 framework.
 *
 * (c) CodeIgniter Foundation <admin@codeigniter.com>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace Tests\Support\Entity;

use CodeIgniter\Entity\Entity;

class UserWithCasts extends Entity
{
    protected $casts = [
        'email' => 'json',
    ];
}
